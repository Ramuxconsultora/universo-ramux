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
    "IA y Tecnología": "https://news.google.com/rss/search?q=Inteligencia+Artificial+OpenAI+NVIDIA+Tech+Empresas+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
    "Tecnología Nacional": "https://news.google.com/rss/search?q=Tecnologia+Argentina+OR+Fintech+Argentina+OR+Software+Argentina+OR+Innovacion+Argentina+OR+Startups+Buenos+Aires+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
    "Economía Global": "https://news.google.com/rss/search?q=Wall+Street+Fed+Economia+Mundial+Mercados+Globales+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
    "Economía Argentina": "https://news.google.com/rss/search?q=Merval+Banco+Central+Argentina+Economia+Dolar+Bonaerense+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
    "Mercado de Capitales (CNV)": "https://news.google.com/rss/search?q=CNV+Argentina+OR+Comisión+Nacional+de+Valores+OR+Mercado+de+Capitales+OR+CEDEARs+OR+Bonos+AL30+when:1d&hl=es-419&gl=AR&ceid=AR:es-419",
    "Radar Laboral": "https://news.google.com/rss/search?q=Reforma+Laboral+Argentina+OR+Leyes+Laborales+OR+Legislacion+Laboral+OR+Empleo+Argentina+when:1d&hl=es-419&gl=AR&ceid=AR:es-419"
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
        
        # Determinar Categoría UI y Alcance
        if "Tecnología" in feed_name or "IA" in feed_name:
            category = "Tecnología"
            scope = "Nacional" if "Nacional" in feed_name else "Internacional"
        elif "Laboral" in feed_name:
            category = "Legal/Laboral" # Nueva categoría sugerida para organizar mejor la plataforma
            scope = "Nacional"
        else:
            category = "Economía"
            scope = "Nacional" if ("Argentina" in feed_name or "CNV" in feed_name) else "Internacional"

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
