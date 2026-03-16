import os
import feedparser
from bs4 import BeautifulSoup
import requests
from supabase import create_client, Client
from datetime import datetime, timedelta, timezone
import time

# --- CONFIGURACIÓN ---
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

RSS_SOURCES = [
    # --- ECONOMÍA ---
    {
        "name": "Economía Nacional",
        "url": "https://news.google.com/rss/search?q=(economía+OR+finanzas+OR+merval+OR+bonos)+argentina+when:3d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Economía"
    },
    {
        "name": "Economía Internacional",
        "url": "https://news.google.com/rss/search?q=(global+markets+OR+wall+street+OR+fed+OR+inflation)+when:3d&hl=en-US&gl=US&ceid=US:en",
        "scope": "Internacional",
        "default_category": "Economía"
    },
    # --- TECNOLOGÍA ---
    {
        "name": "Tecnología Nacional",
        "url": "https://news.google.com/rss/search?q=(tecnología+OR+IA+OR+startups+OR+biotech)+argentina+when:3d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Tecnología"
    },
    {
        "name": "Tecnología Internacional",
        "url": "https://news.google.com/rss/search?q=(AI+OR+artificial+intelligence+OR+tech+innovation+OR+chips)+when:3d&hl=en-US&gl=US&ceid=US:en",
        "scope": "Internacional",
        "default_category": "Tecnología"
    },
    # --- LEGAL & COMPLIANCE ---
    {
        "name": "Legal & Compliance Nacional",
        "url": "https://news.google.com/rss/search?q=(CNV+OR+regulación+OR+normativa+OR+legal+OR+compliance)+argentina+when:3d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Legal & Compliance"
    },
    {
        "name": "Legal & Compliance Internacional",
        "url": "https://news.google.com/rss/search?q=(financial+regulation+OR+compliance+OR+SEC+OR+legal+tech)+when:3d&hl=en-US&gl=US&ceid=US:en",
        "scope": "Internacional",
        "default_category": "Legal & Compliance"
    }
]

def clean_summary(html_content):
    if not html_content:
        return "Sin resumen disponible."
    soup = BeautifulSoup(html_content, 'html.parser')
    text = soup.get_text(separator=' ', strip=True)
    if len(text) > 160:
        return text[:157] + "..."
    return text

def fetch_and_insert_news():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("ERROR: Faltan llaves de Supabase.")
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
    
    ahora = datetime.now(timezone.utc)
    hace_72_horas = ahora - timedelta(hours=72) # Ampliado a 72hs

    for source in RSS_SOURCES:
        print(f"\n--- Scrapeando: {source['name']} ---")
        inserted_for_this_source = 0
        
        try:
            response = requests.get(source["url"], headers=headers, timeout=20)
            feed = feedparser.parse(response.content)
            
            # Revisamos hasta 30 para intentar completar las 10 deseadas tras los filtros
            for entry in feed.entries:
                if inserted_for_this_source >= 10:
                    break # Ya completamos el cupo de 10 para este tag
                
                # --- FILTRO DE FECHA ---
                pub_date = None
                if hasattr(entry, 'published_parsed') and entry.published_parsed:
                    pub_date = datetime.fromtimestamp(time.mktime(entry.published_parsed), tz=timezone.utc)
                
                if pub_date and pub_date < hace_72_horas:
                    continue # Demasiado vieja

                link = entry.link
                
                # Evitar duplicados en DB
                existing = supabase.table('noticias').select('id').eq('url', link).execute()
                if existing.data:
                    continue
                
                new_item = {
                    "title": entry.title,
                    "category": source["default_category"],
                    "summary": clean_summary(entry.summary if hasattr(entry, 'summary') else ""),
                    "source_name": source["name"],
                    "url": link,
                    "scope": source["scope"],
                    "created_at": ahora.isoformat()
                }
                
                try:
                    supabase.table('noticias').insert(new_item).execute()
                    print(f"OK ({inserted_for_this_source + 1}/10): {entry.title[:45]}...")
                    inserted_for_this_source += 1
                    time.sleep(0.4) # Pausa amigable
                except Exception as e:
                    print(f"Error insert: {e}")
                    
            if inserted_for_this_source < 10:
                print(f"Aviso: Solo se encontraron {inserted_for_this_source} noticias frescas para {source['name']}")
                    
        except Exception as e:
            print(f"Error en fuente {source['name']}: {e}")
            
    print(f"\n--- Proceso finalizado ---")

if __name__ == "__main__":
    fetch_and_insert_news()
