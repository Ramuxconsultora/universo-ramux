import os
from supabase import create_client
import json
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
res = supabase.table('noticias').select('*').order('created_at', desc=True).limit(10).execute()
print(json.dumps(res.data, indent=2))
