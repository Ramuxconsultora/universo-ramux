import os
import feedparser
from bs4 import BeautifulSoup
import requests
from supabase import create_client, Client
from datetime import datetime, timedelta, timezone
import time

# --- CONFIGURACIÓN DE VARIABLES (Coincidentes con tus GitHub Secrets) ---
# Usamos el nombre que ya tienes en GitHub para no crear duplicados
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
# NOTA: Si usas RLS en Supabase, asegúrate de que la ANON_KEY tenga permisos de insert
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

RSS_SOURCES = [
    {
        "name": "Clarín/Infobae Economy",
        "url": "https://news.google.com/rss/search?q=economia+argentina+mercados+finanzas&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Economía"
    },
    {
        "name": "Global Markets",
        "url": "https://news.google.com/rss/search?q=global+economy+markets+wall+street+finance&hl=en-US&gl=US&ceid=US:en",
        "scope": "Internacional",
        "default_category": "Economía"
    },
    {
        "name": "Nacional Tech",
        "url": "https://news.google.com/rss/search?q=inteligencia+artificial+tecnologia+startups+argentina&hl=es-419&gl=AR&ceid=AR:es-419",
        "scope": "Nacional",
        "default_category": "Tecnología"
    },
    {
        "name": "Global Tech & AI",
        "url": "https://news.google.com/rss/search?q=artificial+intelligence+tech+innovation&hl=en-US&gl=US&ceid=US:en",
        "scope": "Internacional",
        "default_category": "Tecnología"
    }
]

def clean_summary(html_content):
    if not html_content:
        return "Sin resumen disponible."
    soup = BeautifulSoup(html_content, 'html.parser')
    # Extraemos el texto limpio del HTML del RSS
    text = soup.get_text(separator=' ', strip=True)
    if len(text) > 150:
        return text[:147] + "..."
    return text

def prune_old_news(supabase: Client):
    print("\n--- Limpiando noticias de más de 7 días ---")
    try:
        # Fecha actual con zona horaria para evitar conflictos
        seven_days_ago = datetime.now(timezone.utc) - timedelta(days=7)
        res = supabase.table('noticias').delete().lt('created_at', seven_days_ago.isoformat()).execute()
        print(f"Limpieza completada.")
    except Exception as e:
        print(f"Error al limpiar noticias antiguas: {e}")

def fetch_and_insert_news():
    # Validación de llaves
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("ERROR: No se encontraron las variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY.")
        return

    print(f"Conectando a Supabase en: {SUPABASE_URL}")
    try:
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Error fatal de conexión: {e}")
        return
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    }
    
    total_inserted = 0
    
    for source in RSS_SOURCES:
        print(f"\nProcesando fuente: {source['name']}...")
        
        try:
            response = requests.get(source["url"], headers=headers, timeout=20)
            if response.status_code != 200:
                print(f"Error de conexión con la fuente (Status {response.status_code})")
                continue
                
            feed = feedparser.parse(response.content)
            # Procesamos las 10 noticias más recientes
            for entry in feed.entries[:10]:
                title = entry.title
                link = entry.link
                
                # Limpieza del resumen
                summary_html = entry.summary if hasattr(entry, 'summary') else ""
                summary = clean_summary(summary_html)
                
                # Evitamos duplicados consultando por URL
                existing = supabase.table('noticias').select('id').eq('url', link).execute()
                if existing.data:
                    continue
                
                new_item = {
                    "title": title,
                    "category": source["default_category"],
                    "summary": summary,
                    "source_name": source["name"],
                    "url": link,
                    "scope": source["scope"],
                    "created_at": datetime.now(timezone.utc).isoformat()
                }
                
                try:
                    supabase.table('noticias').insert(new_item).execute()
                    print(f"OK: {title[:40]}...")
                    total_inserted += 1
                    time.sleep(0.8) # Pausa amigable para la base de datos
                except Exception as e:
                    print(f"Error al insertar noticia: {e}")
                    
        except Exception as e:
            print(f"Error en la fuente {source['name']}: {e}")
            
    print(f"\n--- Scrapeo finalizado. Total nuevas: {total_inserted} ---")
    prune_old_news(supabase)

if __name__ == "__main__":
    fetch_and_insert_news()
