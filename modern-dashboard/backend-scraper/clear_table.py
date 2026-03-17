
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def clear_news():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ ERROR: VITE_SUPABASE_URL o SUPABASE_KEY no están definidas.")
        return

    print(f"Connecting to Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    try:
        # Delete all rows
        supabase.table('noticias').delete().neq('id', '00000000-0000-0000-0000-000000000000').execute()
        print("All news cleared from table.")
            
    except Exception as e:
        print(f"Error clearing table: {e}")

if __name__ == "__main__":
    clear_news()
