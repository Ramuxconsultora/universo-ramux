import os
import requests
import time
from datetime import datetime, timezone
from supabase import create_client, Client
from supabase import create_client, Client
from dotenv import load_dotenv, find_dotenv

# 1. Cargar variables de entorno
# Esta función busca el archivo .env localmente. 
# En entornos como GitHub Actions o Vercel, usará las "Secret Keys" configuradas en la plataforma.
load_dotenv(find_dotenv())

# 2. Configuración Supabase y IOL
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")
IOL_USERNAME = os.getenv("IOL_USERNAME")
IOL_PASSWORD = os.getenv("IOL_PASSWORD")

# Validación de variables de entorno
# IOL_USERNAME/PASSWORD son necesarios SOLO si no se provee un VITE_IOL_TOKEN
has_token = os.getenv("VITE_IOL_TOKEN") or os.getenv("IOL_TOKEN")
required_vars = ["VITE_SUPABASE_URL", "SUPABASE_KEY"] if has_token else ["VITE_SUPABASE_URL", "SUPABASE_KEY", "IOL_USERNAME", "IOL_PASSWORD"]
missing_vars = [v for v in required_vars if not os.getenv(v) and not (v == "SUPABASE_KEY" and os.getenv("SUPABASE_SERVICE_ROLE_KEY"))]

if missing_vars:
    print(f"❌ ERROR: Faltan las siguientes variables de entorno: {', '.join(missing_vars)}")
    exit(1)

IOL_TOKEN_URL = "https://api.invertironline.com/token"
IOL_API_URL = "https://api.invertironline.com/api/v2"

# ... (El resto de TICKERS se mantiene igual) ...
TICKERS = [
    {"symbol": "GGAL", "type": "accion", "market": "BCBA"},
    {"symbol": "YPFD", "type": "accion", "market": "BCBA"},
    {"symbol": "PAMP", "type": "accion", "market": "BCBA"},
    {"symbol": "AL30", "type": "bono", "market": "BCBA"},
    {"symbol": "GD30", "type": "bono", "market": "BCBA"},
    {"symbol": "AE38", "type": "bono", "market": "BCBA"},
    {"symbol": "AL29", "type": "bono", "market": "BCBA"},
    {"symbol": "AL35", "type": "bono", "market": "BCBA"},
    {"symbol": "GD35", "type": "bono", "market": "BCBA"},
    {"symbol": "SPY", "type": "cedear", "market": "BCBA"},
    {"symbol": "AAPL", "type": "cedear", "market": "BCBA"}
]

class IOLSync:
    def __init__(self):
        # 1. Intentar cargar token desde variables de entorno (Vercel/GitHub Actions)
        # Esto permite reutilizar un token obtenido en Postman o por otro proceso
        self.token = os.getenv("VITE_IOL_TOKEN") or os.getenv("IOL_TOKEN")
        expires_str = os.getenv("VITE_IOL_TOKEN_EXPIRES") or os.getenv("IOL_TOKEN_EXPIRES")
        
        try:
            self.token_expires = float(expires_str) if expires_str else 0
        except ValueError:
            self.token_expires = 0
            
        if self.token:
            print(f"ℹ️ Usando token pre-configurado (Expira en: {max(0, int(self.token_expires - time.time()))}s)")

        # Validación de URL y KEY antes de crear el cliente
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("Faltan las credenciales de Supabase. Revisa los Secrets o el .env")
        self.supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    # ... (get_token, fetch_quote y sync se mantienen igual) ...
    def get_token(self):
        if self.token and time.time() < self.token_expires:
            return self.token
        print("Obteniendo nuevo token de IOL...")
        payload = {
            "username": IOL_USERNAME,
            "password": IOL_PASSWORD,
            "grant_type": "password"
        }
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        try:
            response = requests.post(IOL_TOKEN_URL, data=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            self.token = data["access_token"]
            self.token_expires = time.time() + data["expires_in"] - 60
            return self.token
        except Exception as e:
            print(f"Error al obtener token de IOL: {e}")
            return None

    def fetch_quote(self, symbol, market):
        token = self.get_token()
        if not token: return None
        headers = {"Authorization": f"Bearer {token}"}
        url = f"{IOL_API_URL}/{market}/Titulos/{symbol}/Cotizacion"
        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                return response.json()
            else:
                alt_url = f"{IOL_API_URL}/Titulos/{symbol}/Cotizacion"
                response = requests.get(alt_url, headers=headers, params={"mercado": market})
                return response.json() if response.status_code == 200 else None
        except Exception as e:
            print(f"Error en {symbol}: {e}")
            return None

    def fetch_gold_price(self):
        print("Obteniendo precio del Oro (Spot)...")
        try:
            # Usando gold-api.com (Free, no key needed for basic usage)
            response = requests.get("https://api.gold-api.com/api/v1/gold")
            if response.status_code == 200:
                data = response.json()
                price = data.get("price")
                if price:
                    quote_data = {
                        "symbol": "GOLD",
                        "price": float(price),
                        "variation": 0.0, # Gold API sometimes doesn't provide daily variation directly
                        "last_update": datetime.now(timezone.utc).isoformat(),
                        "category": "COMMODITY"
                    }
                    self.supabase.table("market_quotes").upsert(quote_data, on_conflict="symbol").execute()
                    print(f"✅ GOLD  | ${price:<8} | (Spot)")
                    return True
            return False
        except Exception as e:
            print(f"⚠️ Error al obtener Oro: {e}")
            return False

    def sync(self):
        print(f"🚀 {datetime.now()}: Iniciando sync...")
        
        # 1. Sync Tickers usuales
        for item in TICKERS:
            # ... (existente)
            symbol = item["symbol"]
            market = item["market"]
            data = self.fetch_quote(symbol, market)
            if data and "ultimoPrecio" in data:
                price = data.get("ultimoPrecio")
                variation = data.get("variacion") if data.get("variacion") is not None else data.get("variaciones", 0)
                quote_data = {
                    "symbol": symbol,
                    "price": float(price),
                    "variation": float(variation) if variation is not None else 0,
                    "last_update": datetime.now(timezone.utc).isoformat(),
                    "category": item["type"].upper()
                }
                try:
                    self.supabase.table("market_quotes").upsert(quote_data, on_conflict="symbol").execute()
                    print(f"✅ {symbol:5} | ${price:<8} | {variation}%")
                except Exception as e:
                    print(f"❌ Error Supabase {symbol}: {e}")
            else:
                print(f"⚠️ No se obtuvo data válida para {symbol}")
            time.sleep(0.5)

        # 2. Sync Gold (para RMX)
        self.fetch_gold_price()

if __name__ == "__main__":
    # Cambié el mensaje de error para que no culpe solo al .env
    if not all([IOL_USERNAME, IOL_PASSWORD, SUPABASE_URL, SUPABASE_KEY]):
        print("❌ ERROR: Faltan variables de entorno. Asegúrate de tenerlas en los Secrets de GitHub o en tu archivo .env local.")
    else:
        try:
            IOLSync().sync()
        except Exception as e:
            print(f"❌ Fallo en la ejecución: {e}")
