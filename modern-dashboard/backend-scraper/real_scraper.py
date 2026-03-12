
import os
import feedparser
import requests
from supabase import create_client, Client
from datetime import datetime
import time

# SUPABASE CREDENTIALS (SERVICE ROLE KEY FOR WRITE ACCESS)
SUPABASE_URL = "https://gwqjgddgadljotrwcmde.supabase.co"
SUPABASE_KEY = "sb_secret_fSvdNQzHXveRnv2iXSfsfw_GJ7-hNxE"

# RSS FEEDS CONFIGURATION
RSS_FEEDS = {
    "IA y Tecnología": "https://news.google.com/rss/search?q=Inteligencia+Artificial+OpenAI+NVIDIA+Tech+Empresas&hl=es-419&gl=AR&ceid=AR:es-419",
    "Economía Global": "https://news.google.com/rss/search?q=Wall+Street+Fed+Economia+Mundial+Mercados+Globales&hl=es-419&gl=AR&ceid=AR:es-419",
    "Economía Argentina": "https://news.google.com/rss/search?q=Merval+Banco+Central+Argentina+Economia+Dolar+Bonaerense&hl=es-419&gl=AR&ceid=AR:es-419"
}

def fetch_and_insert_news():
    print(f"Connecting to Supabase...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    total_inserted = 0
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
    }

    for category, feed_url in RSS_FEEDS.items():
        print(f"Fetching {category} from Google News...")
        
        try:
            response = requests.get(feed_url, headers=headers, timeout=10)
            if response.status_code != 200:
                print(f"Failed to fetch feed: {response.status_code}")
                continue
                
            feed = feedparser.parse(response.content)
            
            # Take top 5 items from each feed to avoid spamming
            entries = feed.entries[:5]
            
            for entry in entries:
                title = entry.title
                link = entry.link
                # published = entry.published if hasattr(entry, 'published') else datetime.now().isoformat()
                summary = entry.summary if hasattr(entry, 'summary') else "Sin resumen disponible."
                source = entry.source.title if hasattr(entry, 'source') else "Google News"
                
                # Clean up summary (often contains HTML)
                # For simplicity, we just take it as is or could sanitize html.
                # In Google News RSS, summary is often short HTML snippets.

                # 1. DUPLICATE CHECK
                # Check if a news with this title already exists
                existing = supabase.table('noticias').select('id').eq('title', title).execute()
                
                if existing.data and len(existing.data) > 0:
                    print(f"Skipping duplicate: {title[:30]}...")
                    continue

                # 2. INSERT
                new_item = {
                    "title": title,
                    "category": category,
                    "summary": summary, 
                    "source_name": source,
                    "image_url": "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop", # Default image
                    "url": link # Store the original link
                    # "created_at": published # Let Supabase handle created_at
                }
                
                try:
                    res = supabase.table('noticias').insert(new_item).execute()
                    print(f"Inserted: {title[:30]}...")
                    total_inserted += 1
                except Exception as e:
                    print(f"Error inserting: {e}")
                    
        except Exception as e:
            print(f"Error fetching feed {category}: {e}")
            
    print(f"Done! Inserted {total_inserted} new items.")

if __name__ == "__main__":
    fetch_and_insert_news()
