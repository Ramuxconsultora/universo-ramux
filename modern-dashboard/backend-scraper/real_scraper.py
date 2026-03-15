import os
import feedparser
import requests
from supabase import create_client, Client
from datetime import datetime, timedelta, timezone
import time

# CREDENCIALES SUPABASE 
# Recuerda usar variables de entorno en producción
SUPABASE_URL = "https://gwqjgddgadljotrwcmde.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "sb_secret_fSvdNQzHXveRnv2iXSfsfw_GJ7-hNxE")

# CONFIGURACIÓN DE FEEDS RSS AMPLIADA
RSS_FEEDS = {
    "Tecnología Internacional": "https://news.google.com/rss/search?q=(Silicon+Valley+OR+Shenzhen+OR+Tokyo+OR+Nvidia+OR+OpenAI)+Tech+when:1d&hl=es-419&gl=US&ceid=US:es-419",
    "Tecnología Nacional": "https://news.google.com/rss/search?q=Tecnologia+Argentina+OR+Fintech+Argentina+OR+Software+Argentina+OR+Startups+Buenos+Aires+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
    "Economía Internacional": "https://news.google.com/rss/search?q=Wall+Street+OR+Fed+OR+Nasdaq+OR+S%26P500+OR+European+Central+Bank+when:1d&hl=es-419&gl=US&ceid=US:es-419",
    "Economía Nacional": "https://news.google.com/rss/search?q=Dolar+OR+Merval+OR+BCRA+OR+CNV+OR+Cedears+Argentina+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
    "Radar Laboral Internacional": "https://news.google.com/rss/search?q=Global+Labor+Trends+OR+EU+Work+Regulation+OR+Remote+Work+Global+when:1d&hl=es-419&gl=US&ceid=US:es-419",
    "Radar Laboral Nacional": "https://news.google.com/rss/search?q=Reforma+Laboral+Argentina+OR+Leyes+Laborales+Argentina+OR+Gremio+Argentina+when:1d&hl=es-419&gl=AR&ceid=AR:es-419"
}

def fetch_and_insert_news():
    print(f"Conectando a Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    total_inserted = 0
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }

    # CÁLCULO ESTRICTO DE 24 HORAS
    ahora = datetime.now(timezone.utc)
    hace_24_horas = ahora - timedelta(hours=24)

    for feed_name, feed_url in RSS_FEEDS.items():
        print(f"\nObteniendo {feed_name} de Google News...")
        
        # Determinar Categoría UI y Alcance (Dinámico según nombre de feed)
        scope = "Nacional" if "Nacional" in feed_name else "Internacional"
        
        if "Tecnología" in feed_name or "IA" in feed_name:
            category = "Tecnología"
        elif "Laboral" in feed_name:
            category = "Legal/Laboral" 
        else:
            category = "Economía"

        try:
            response = requests.get(feed_url, headers=headers, timeout=10)
            if response.status_code != 200:
                print(f"Fallo al obtener el feed. Código HTTP: {response.status_code}")
                continue
                
            feed = feedparser.parse(response.content)
            
            # BÚSQUEDA EXHAUSTIVA
            entries = feed.entries
            print(f"Encontradas {len(entries)} noticias en el feed.")
            
            for entry in entries:
                # VALIDACIÓN ESTRICTA DE FECHA (Últimas 24 hs relativas a hoy)
                if hasattr(entry, 'published_parsed') and entry.published_parsed:
                    pub_datetime = datetime.fromtimestamp(time.mktime(entry.published_parsed), timezone.utc)
                    
                    if pub_datetime < hace_24_horas:
                        continue
                
                title = entry.title
                link = entry.link
                summary = entry.summary if hasattr(entry, 'summary') else "Sin resumen disponible."
                source = entry.source.title if hasattr(entry, 'source') else "Google News"

                # VERIFICACIÓN DE DUPLICADOS EN SUPABASE
                existing = supabase.table('noticias').select('id').eq('title', title).execute()
                
                if existing.data and len(existing.data) > 0:
                    print(f"Ignorando duplicado: {title[:40]}...")
                    continue

                # INSERCIÓN
                new_item = {
                    "title": title,
                    "category": category,
                    "summary": summary, 
                    "source_name": source,
                    "image_url": "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop",
                    "url": link,
                    "scope": scope
                }
                
                try:
                    supabase.table('noticias').insert(new_item).execute()
                    print(f"Insertada [{scope} - {category}]: {title[:40]}...")
                    total_inserted += 1
                except Exception as e:
                    print(f"Error al insertar en Supabase: {e}")
                    
        except Exception as e:
            print(f"Error procesando el feed {feed_name}: {e}")
            
    print(f"\n¡Proceso terminado! Se insertaron {total_inserted} nuevas noticias.")

if __name__ == "__main__":
    fetch_and_insert_news()
