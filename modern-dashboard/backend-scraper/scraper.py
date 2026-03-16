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
    # --- GEOGRÁFICAS (Alcance) ---
    {
        "name": "Entre Ríos Local",
        "url": "https://news.google.com/rss/search?q=(Paraná+OR+Entre+Ríos)+when:15d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Entre Ríos",
        "default_category": "Regional"
    },
    {
        "name": "Buenos Aires / CABA",
        "url": "https://news.google.com/rss/search?q=(CABA+OR+Buenos+Aires)+economía+when:15d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Buenos Aires",
        "default_category": "Regional"
    },
    # --- SERVICIOS CONSULTORA (Tags) ---
    {
        "name": "Asesoría Financiera",
        "url": "https://news.google.com/rss/search?q=(inversiones+OR+mercado+de+capitales+OR+finanzas)+argentina+when:15d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Asesoría Financiera"
    },
    {
        "name": "Legal & Compliance",
        "url": "https://news.google.com/rss/search?q=(CNV+OR+normativa+OR+regulación+OR+legaltech)+argentina+when:15d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Legal & Compliance"
    },
    {
        "name": "Gestión de RRHH",
        "url": "https://news.google.com/rss/search?q=(recursos+humanos+OR+liderazgo+OR+talento+OR+laboral)+argentina+when:15d&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Gestión de RRHH"
    },
    {
        "name": "Tecnología & IA",
        "url": "https://news.google.com/rss/search?q=(IA+OR+inteligencia+artificial+OR+fintech)+when:15d&hl=en-US&gl=US&ceid=US:en",
        "scope": "Internacional",
        "default_category": "Tecnología"
    }
]

def clean_summary(html_content):
    if not html_content: return "Sin resumen."
    soup = BeautifulSoup(html_content, 'html.parser')
    text = soup.get_text(separator=' ', strip=True)
    return text[:160] + "..." if len(text) > 163 else text

def fetch_and_insert_news():
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    headers = {"User-Agent": "Mozilla/5.0"}
    
    ahora = datetime.now(timezone.utc)
    hace_15_dias = ahora - timedelta(days=15) # Rango ampliado a 15 días

    for source in RSS_SOURCES:
        print(f"\nProcesando: {source['name']}")
        try:
            response = requests.get(source["url"], headers=headers, timeout=20)
            feed = feedparser.parse(response.content)
            
            inserted = 0
            for entry in feed.entries:
                if inserted >= 10: break
                
                # Obtener fecha real
                pub_date = datetime.fromtimestamp(time.mktime(entry.published_parsed), tz=timezone.utc) if hasattr(entry, 'published_parsed') else ahora
                
                if pub_date < hace_15_dias: continue # Filtro estricto de 15 días

                # Evitar duplicados por URL
                existing = supabase.table('noticias').select('id').eq('url', entry.link).execute()
                if existing.data: continue
                
                new_item = {
                    "title": entry.title,
                    "category": source["default_category"],
                    "summary": clean_summary(entry.summary if hasattr(entry, 'summary') else ""),
                    "source_name": source["name"],
                    "url": entry.link,
                    "scope": source["scope"],
                    "created_at": pub_date.isoformat() # Guardamos la fecha original de la noticia
                }
                
                supabase.table('noticias').insert(new_item).execute()
                inserted += 1
                print(f"OK: {entry.title[:30]}")
                    
        except Exception as e:
            print(f"Error en {source['name']}: {e}")

if __name__ == "__main__":
    fetch_and_insert_news()
