
import os
from supabase import create_client, Client

# USING THE PUBLIC ANON KEY (simulate frontend)
SUPABASE_URL = "https://gwqjgddgadljotrwcmde.supabase.co"
SUPABASE_KEY = "sb_publishable_ssk19Kx5DDUgVOd-Y7tmYQ_6-_S_VvY"

def verify_read():
    print(f"Connecting to Supabase as PUBLIC USER (Anon)...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    try:
        response = supabase.table('noticias').select("*").execute()
        # response.data is the list
        data = response.data
        
        print(f"Read success! Found {len(data)} items.")
        for item in data:
            print(f"- {item.get('title')}")
            
    except Exception as e:
        print(f"READ FAILED: {e}")

if __name__ == "__main__":
    verify_read()
