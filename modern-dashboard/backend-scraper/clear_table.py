
import os
from supabase import create_client, Client

SUPABASE_URL = "https://gwqjgddgadljotrwcmde.supabase.co"
SUPABASE_KEY = "sb_secret_fSvdNQzHXveRnv2iXSfsfw_GJ7-hNxE"

def clear_news():
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
