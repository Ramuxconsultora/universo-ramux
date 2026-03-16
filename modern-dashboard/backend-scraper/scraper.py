import os
import feedparser
from bs4 import BeautifulSoup
import requests
from supabase import create_client, Client
from datetime import datetime, timedelta, timezone
import time
import urllib.parse

# --- CONFIGURACIÓN ---
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

def get_google_url(query):
    """Genera una URL de Google News codificada correctamente."""
    base_url = "https://news.google.com/rss/search?q="
    params = "&hl=es-419&gl=AR&ceid=AR:es-419"
    return base_url + urllib.parse.quote(query) + params

RSS_SOURCES = [
    # --- GEOGRÁFICAS (Prioridad Regional) ---
    {
        "name": "Entre Ríos Noticias",
        "query": "(Paraná OR Entre Ríos OR Concordia) when:15d",
        "scope": "Entre Ríos",
        "default_category": "Regional"
    },
    {
        "name": "Buenos Aires Económico",
        "query": "(CABA OR Buenos Aires OR AMBA) economía when:15d",
        "scope": "Buenos Aires",
        "default_category": "Economía"
    },
    # --- SERVICIOS CONSULTORA (Tags) ---
    {
        "name": "Asesoría Financiera",
        "query": "(inversiones OR mercado de capitales OR finanzas OR bonos) argentina when:15d",
        "scope": "Nacional",
        "default_category": "Asesoría Financiera"
    },
    {
        "name": "Legal & Compliance",
        "query": "(CNV OR regulación OR normativa OR compliance OR leyes) argentina when:15d",
        "scope": "Nacional",
        "default_category": "Legal & Compliance"
    },
    {
        "name": "Gestión de RRHH",
        "query": "(recursos humanos OR RRHH OR empleo OR relaciones laborales) argentina when:15d",
        "scope": "Nacional",
        "default_category": "Gestión de RRHH"
    },
    {
        "name": "Tecnología & IA",
        "query": "(IA OR inteligencia artificial OR fintech OR blockchain) when:15d",
        "scope": "Internacional",
        "default_category": "Tecnología"
    }
]

def clean_summary(html_content):
    if not html_content: return "Sin resumen."
    soup = BeautifulSoup(html_content, 'html.parser')
    # Eliminamos links de Google News que a veces vienen en el summary
    for a in soup.find_all('a'): a.decompose()
    text = soup.get_text(separator=' ', strip=True)
    return text[:160] + "..." if len(text) > 163 else text

def fetch_and_insert_news():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("ERROR: Credenciales de Supabase no encontradas.")
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
    
    ahora = datetime.now(timezone.utc)
    hace_15_dias = ahora - timedelta(days=15)

    for source in RSS_SOURCES:
        search_url = get_google_url(source["query"])
        print(f"\n--- Procesando: {source['name']} ---")
        
        try:
            response = requests.get(search_url, headers=headers, timeout=25)
            feed = feedparser.parse(response.content)
            
            if not feed.entries:
                print(f"Aviso: No se encontraron noticias para {source['name']}")
                continue

            inserted = 0
            for entry in feed.entries:
                if inserted >= 12: break # Aumentamos cupo para asegurar 10 tras duplicados
                
                # Obtener fecha real de publicación
                if hasattr(entry, 'published_parsed') and entry.published_parsed:
                    pub_date = datetime.fromtimestamp(time.mktime(entry.published_parsed), tz=timezone.utc)
                else:
                    pub_date = ahora

                if pub_date < hace_15_dias: continue 

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
                    "created_at": pub_date.isoformat() 
                }
                
                try:
                    supabase.table('noticias').insert(new_item).execute()
                    print(f"OK: {entry.title[:40]}...")
                    inserted += 1
                    time.sleep(0.4)
                except Exception as e:
                    print(f"Error insertando en Supabase: {e}")
                    
        except Exception as e:
            print(f"Error de conexión en {source['name']}: {e}")

if __name__ == "__main__":
    fetch_and_insert_news()
