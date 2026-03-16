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
        "name": "Mercados Argentina",
        "url": "https://news.google.com/rss/search?q=economía+argentina+bonos+acciones+merval+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Economía"
    },
    {
        "name": "Global Markets",
        "url": "https://news.google.com/rss/search?q=wall+street+fed+inflation+global+markets+when:1d&hl=en-US&gl=US&ceid=US:en",
        "scope": "Internacional",
        "default_category": "Economía"
    },
    # --- TECNOLOGÍA ---
    {
        "name": "Tech & AI Argentina",
        "url": "https://news.google.com/rss/search?q=tecnología+IA+startups+argentina+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Tecnología"
    },
    {
        "name": "Global Tech & AI",
        "url": "https://news.google.com/rss/search?q=artificial+intelligence+tech+innovation+when:1d&hl=en-US&gl=US&ceid=US:en",
        "scope": "Internacional",
        "default_category": "Tecnología"
    },
    # --- LEGAL & COMPLIANCE ---
    {
        "name": "Legal & Regulación ARG",
        "url": "https://news.google.com/rss/search?q=CNV+leyes+regulación+finanzas+argentina+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Legal & Compliance"
    },
    {
        "name": "Global Compliance",
        "url": "https://news.google.com/rss/search?q=financial+regulation+compliance+SEC+global+when:1d&hl=en-US&gl=US&ceid=US:en",
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
    
    total_inserted = 0
    ahora = datetime.now(timezone.utc)
    hace_24_horas = ahora - timedelta(hours=24)

    for source in RSS_SOURCES:
        print(f"\nScrapeando: {source['name']} ({source['scope']})")
        try:
            response = requests.get(source["url"], headers=headers, timeout=20)
            feed = feedparser.parse(response.content)
            
            for entry in feed.entries[:10]:
                # --- FILTRO DE FECHA ESTRICTO ---
                pub_date = None
                if hasattr(entry, 'published_parsed') and entry.published_parsed:
                    pub_date = datetime.fromtimestamp(time.mktime(entry.published_parsed), tz=timezone.utc)
                
                if pub_date and pub_date < hace_24_horas:
                    continue # Saltamos noticias viejas

                title = entry.title
                link = entry.link
                
                # Evitar duplicados
                existing = supabase.table('noticias').select('id').eq('url', link).execute()
                if existing.data:
                    continue
                
                new_item = {
                    "title": title,
                    "category": source["default_category"],
                    "summary": clean_summary(entry.summary if hasattr(entry, 'summary') else ""),
                    "source_name": source["name"],
                    "url": link,
                    "scope": source["scope"],
                    "created_at": ahora.isoformat()
                }
                
                try:
                    supabase.table('noticias').insert(new_item).execute()
                    print(f"OK: {title[:45]}...")
                    total_inserted += 1
                    time.sleep(0.5)
                except Exception as e:
                    print(f"Error insert: {e}")
                    
        except Exception as e:
            print(f"Error en fuente {source['name']}: {e}")
            
    print(f"\n--- Fin del proceso. Nuevas noticias: {total_inserted} ---")

if __name__ == "__main__":
    fetch_and_insert_news()
