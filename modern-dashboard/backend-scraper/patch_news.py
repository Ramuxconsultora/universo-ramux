import os
from supabase import create_client
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Validación de variables
if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ ERROR: VITE_SUPABASE_URL o SUPABASE_KEY no están definidas.")
    exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fetch all items with null scope
res = supabase.table('noticias').select('id, category').is_('scope', 'null').execute()
items = res.data
print(f"Found {len(items)} items with null scope.")

for item in items:
    scope = "Nacional" if "Argentina" in item['category'] else "Internacional"
    supabase.table('noticias').update({'scope': scope}).eq('id', item['id']).execute()
    print(f"Updated item {item['id']} to scope {scope}")

print("Done patching.")
