import os
from supabase import create_client
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Validación
if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ ERROR: VITE_SUPABASE_URL o SUPABASE_KEY no están definidas.")
    exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Define the threshold (e.g., 7 days ago)
threshold = (datetime.now() - timedelta(days=7)).isoformat()
print(f"Deleting news older than {threshold}...")

res = supabase.table('noticias').delete().lt('created_at', threshold).execute()
print(f"Cleanup done.")
