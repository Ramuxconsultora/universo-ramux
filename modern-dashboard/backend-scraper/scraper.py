import os
import feedparser
from bs4 import BeautifulSoup
import requests
from supabase import create_client, Client
from datetime import datetime, timedelta, timezone
import time
import urllib.parse
from dotenv import load_dotenv

# --- CARGAR VARIABLES ---
# Intentamos cargar .env si existe (local), si no, os.getenv buscará en el sistema (GitHub)
load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# Validación robusta de credenciales
if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ ERROR: Credenciales de Supabase no encontradas (VITE_SUPABASE_URL o SUPABASE_KEY). Verifica Secrets o .env")
    exit(1)

def get_google_url(query):
    """Genera una URL de Google News codificada correctamente."""
    base_url = "https://news.google.com/rss/search?q="
    params = "&hl=es-419&gl=AR&ceid=AR:es-419"
    return base_url + urllib.parse.quote(query) + params

# --- FUENTES Y CATEGORÍAS ---
RSS_SOURCES = [
    {"name": "Finanzas Nacional", "query": "(mercado de capitales OR finanzas OR inversiones OR merval OR bonos) argentina when:4d", "scope": "Nacional", "category": "Finanzas y Mercado"},
    {"name": "Finanzas Internacional", "query": "(stock market OR wall street OR trading OR global finance) when:4d", "scope": "Internacional", "category": "Finanzas y Mercado"},
    {"name": "Legales Nacional", "query": "(leyes OR normativa OR boletín oficial OR jurisprudencia OR legal) argentina when:4d", "scope": "Nacional", "category": "Legales"},
    {"name": "Legales Internacional", "query": "(international law OR regulations OR legal news OR court ruling) when:4d", "scope": "Internacional", "category": "Legales"},
    {"name": "RRHH Nacional", "query": "(recursos humanos OR RRHH OR mercado laboral OR empleo) argentina when:4d", "scope": "Nacional", "category": "Recursos Humanos"},
    {"name": "RRHH Internacional", "query": "(human resources OR talent management OR future of work OR remote work) when:4d", "scope": "Internacional", "category": "Recursos Humanos"},
    {"name": "Tecno Nacional", "query": "(tecnología OR innovación OR startups OR software OR IA) argentina when:4d", "scope": "Nacional", "category": "Tecnología e Innovación"},
    {"name": "Tecno Internacional", "query": "(tech news OR innovation OR artificial intelligence OR silicon valley) when:4d", "scope": "Internacional", "category": "Tecnología e Innovación"},
    {"name": "Economía Nacional", "query": "(economía OR macroeconomía OR inflación OR pbi) argentina when:4d", "scope": "Nacional", "category": "Economía"},
    {"name": "Economía Internacional", "query": "(global economy OR IMF OR world bank OR inflation global) when:4d", "scope": "Internacional", "category": "Economía"}
]

def clean_summary(html_content):
    if not html_content: return "Sin resumen disponible."
    soup = BeautifulSoup(html_content, 'html.parser')
    for a in soup.find_all('a'): a.decompose()
    text = soup.get_text(separator=' ', strip=True)
    return text[:180] + "..." if len(text) > 183 else text

def fetch_and_insert_news():
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"❌ Error al conectar con Supabase: {e}")
        return

    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
    
    ahora = datetime.now(timezone.utc)
    hace_4_dias = ahora - timedelta(days=4)

    for source in RSS_SOURCES:
        search_url = get_google_url(source["query"])
        print(f"\n>>> Buscando: {source['name']} ({source['scope']})")
        
        try:
            response = requests.get(search_url, headers=headers, timeout=25)
            feed = feedparser.parse(response.content)
            
            entries = sorted(feed.entries, 
                            key=lambda x: x.get('published_parsed', 0), 
                            reverse=True)

            inserted = 0
            for entry in entries:
                if inserted >= 20: break 
                
                if hasattr(entry, 'published_parsed') and entry.published_parsed:
                    pub_date = datetime.fromtimestamp(time.mktime(entry.published_parsed), tz=timezone.utc)
                else:
                    pub_date = ahora

                if pub_date < hace_4_dias: continue 

                # Verificación de duplicados
                existing = supabase.table('noticias').select('id').eq('url', entry.link).execute()
                if existing.data: continue
                
                new_item = {
                    "title": entry.title,
                    "category": source["category"],
                    "summary": clean_summary(entry.summary if hasattr(entry, 'summary') else ""),
                    "source_name": entry.get('source', {}).get('title', source["name"]),
                    "url": entry.link,
                    "scope": source["scope"],
                    "created_at": pub_date.isoformat() 
                }
                
                try:
                    supabase.table('noticias').insert(new_item).execute()
                    inserted += 1
                    print(f"  [{inserted}] Insertado: {entry.title[:50]}...")
                    time.sleep(0.2) 
                except Exception as e:
                    print(f"  Error en inserción: {e}")
                    
            print(f"--- Total {source['name']}: {inserted} noticias guardadas ---")

        except Exception as e:
            print(f"Error de conexión en {source['name']}: {e}")

if __name__ == "__main__":
    fetch_and_insert_news()
