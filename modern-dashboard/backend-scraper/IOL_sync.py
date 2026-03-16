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
        if not token:
            return None

        headers = {"Authorization": f"Bearer {token}"}
        url = f"{IOL_API_URL}/Titulos/{symbol}/Cotizacion"
        params = {"mercado": market}

        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error al obtener cotización de {symbol}: {e}")
            return None

    def sync(self):
        print(f"Iniciando sincronización: {datetime.now()}")
        
        for item in TICKERS:
            symbol = item["symbol"]
            market = item["market"]
            
            data = self.fetch_quote(symbol, market)
            if data:
                quote_data = {
                    "symbol": symbol,
                    "name": symbol, # Podríamos obtener el nombre completo con otro endpoint si fuera necesario
                    "price": data.get("ultimoPrecio"),
                    "variation": data.get("variacion"),
                    "last_update": datetime.now(timezone.utc).isoformat(),
                    "category": item["type"].upper()
                }
                
                try:
                    self.supabase.table("market_quotes").upsert(quote_data).execute()
                    print(f"Sincronizado {symbol}: ${quote_data['price']} ({quote_data['variation']}%)")
                except Exception as e:
                    print(f"Error al subir a Supabase ({symbol}): {e}")
            
            # Respetar rate limits de la API
            time.sleep(1)

if __name__ == "__main__":
    # Verificación de credenciales
    if not all([IOL_USERNAME, IOL_PASSWORD, SUPABASE_URL, SUPABASE_KEY]):
        print("Error: Faltan variables de entorno (IOL_USERNAME, IOL_PASSWORD, etc.)")
    else:
        syncer = IOLSync()
        syncer.sync()
