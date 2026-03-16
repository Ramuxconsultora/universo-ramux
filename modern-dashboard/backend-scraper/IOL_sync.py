import os
import requests
import time
from datetime import datetime, timezone
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Configuración
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
IOL_USERNAME = os.getenv("IOL_USERNAME")
IOL_PASSWORD = os.getenv("IOL_PASSWORD")
IOL_TOKEN_URL = "https://api.invertironline.com/token"
IOL_API_URL = "https://api.invertironline.com/api/v2"

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
            self.token_expires = time.time() + data.get("expires_in", 3600) - 60
            return self.token
        except Exception as e:
            print(f"❌ Error de autenticación IOL: {e}")
            return None

    def fetch_quote(self, symbol, market):
        token = self.get_token()
        if not token: return None

        headers = {"Authorization": f"Bearer {token}"}
        
        # CAMBIO CLAVE: IOL suele usar /api/v2/{mercado}/Titulos/{simbolo}/Cotizacion
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
                variation = data.get("variaciones", 0) # A veces es 'variaciones' en plural o 'variacion'
                
                quote_data = {
                    "symbol": symbol,
                    "price": float(price),
                    "variation": float(variation) if variation else 0,
                    "last_update": datetime.now(timezone.utc).isoformat(),
                    "category": item["type"].upper()
                }
                
                try:
                    # Requiere que 'symbol' sea Primary Key en Supabase
                    self.supabase.table("market_quotes").upsert(quote_data).execute()
                    print(f"✅ {symbol:5} | ${price:<8} | {variation}%")
                except Exception as e:
                    print(f"❌ Error Supabase {symbol}: {e}")
            else:
                print(f"⚠️ No se obtuvo data para {symbol}")
            
            time.sleep(0.5) # IOL es sensible al spam

if __name__ == "__main__":
    if not all([IOL_USERNAME, IOL_PASSWORD, SUPABASE_URL, SUPABASE_KEY]):
        print("Faltan variables de entorno.")
    else:
        IOLSync().sync()
