import os
import requests
import time
from datetime import datetime, timezone
from supabase import create_client, Client
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración Supabase
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") # Necesitamos Service Role para bypass RLS si es necesario, o usar la key anon si la política lo permite

# Configuración IOL
IOL_USERNAME = os.getenv("IOL_USERNAME")
IOL_PASSWORD = os.getenv("IOL_PASSWORD")
IOL_TOKEN_URL = "https://api.invertironline.com/token"
IOL_API_URL = "https://api.invertironline.com/api/v2"

# Activos a monitorear
TICKERS = [
    {"symbol": "GGAL", "type": "accion", "market": "BCBA"},
    {"symbol": "YPFD", "type": "accion", "market": "BCBA"},
    {"symbol": "PAMP", "type": "accion", "market": "BCBA"},
    {"symbol": "AL30", "type": "bono", "market": "BCBA"},
    {"symbol": "GD30", "type": "bono", "market": "BCBA"},
    {"symbol": "SPY", "type": "cedear", "market": "BCBA"},
    {"symbol": "AAPL", "type": "cedear", "market": "BCBA"}
]

class IOLSync:
    def __init__(self):
        self.token = None
        self.token_expires = 0
        self.supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

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
            # Guardamos el tiempo de expiración (restando un margen de seguridad)
            self.token_expires = time.time() + data["expires_in"] - 60
            return self.token
        except Exception as e:
            print(f"Error al obtener token de IOL: {e}")
            return None

    def fetch_quote(self, symbol, market):
        token = self.get_token()
        if not token: return None

        headers = {"Authorization": f"Bearer {token}"}
        
        # El formato /api/v2/{mercado}/Titulos/{simbolo}/Cotizacion es más robusto para IOL V2
        url = f"{IOL_API_URL}/{market}/Titulos/{symbol}/Cotizacion"

        try:
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                return response.json()
            else:
                # Intentar formato alternativo si el primero falla
                alt_url = f"{IOL_API_URL}/Titulos/{symbol}/Cotizacion"
                response = requests.get(alt_url, headers=headers, params={"mercado": market})
                return response.json() if response.status_code == 200 else None
        except Exception as e:
            print(f"Error en {symbol}: {e}")
            return None

    def sync(self):
        print(f"🚀 {datetime.now()}: Iniciando sync...")
        
        for item in TICKERS:
            symbol = item["symbol"]
            market = item["market"]
            
            data = self.fetch_quote(symbol, market)
            
            if data and "ultimoPrecio" in data:
                price = data.get("ultimoPrecio")
                # IOL a veces envía 'variacion' y otras 'variaciones'
                variation = data.get("variacion") if data.get("variacion") is not None else data.get("variaciones", 0)
                
                quote_data = {
                    "symbol": symbol,
                    "price": float(price),
                    "variation": float(variation) if variation is not None else 0,
                    "last_update": datetime.now(timezone.utc).isoformat(),
                    "category": item["type"].upper()
                }
                
                try:
                    self.supabase.table("market_quotes").upsert(quote_data).execute()
                    print(f"✅ {symbol:5} | ${price:<8} | {variation}%")
                except Exception as e:
                    # Fallback por si falta la columna category en la DB
                    if "category" in str(e):
                        del quote_data["category"]
                        try:
                            self.supabase.table("market_quotes").upsert(quote_data).execute()
                            print(f"✅ {symbol:5} (sin cat) | ${price:<8}")
                        except Exception as e2:
                            print(f"❌ Error crítico Supabase {symbol}: {e2}")
                    else:
                        print(f"❌ Error Supabase {symbol}: {e}")
            else:
                print(f"⚠️ No se obtuvo data válida para {symbol}")
            
            time.sleep(0.5) 

if __name__ == "__main__":
    if not all([IOL_USERNAME, IOL_PASSWORD, SUPABASE_URL, SUPABASE_KEY]):
        print("❌ Faltan variables de entorno en el archivo .env.")
    else:
        IOLSync().sync()

