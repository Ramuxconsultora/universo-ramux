import os
import feedparser
from bs4 import BeautifulSoup
import requests
from supabase import create_client, Client
from datetime import datetime, timedelta
import time
import random

SUPABASE_URL = "https://gwqjgddgadljotrwcmde.supabase.co"
SUPABASE_KEY = "sb_secret_fSvdNQzHXveRnv2iXSfsfw_GJ7-hNxE"

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
    text = soup.get_text(separator=' ', strip=True)
    if len(text) > 150:
        return text[:147] + "..."
    return text

def prune_old_news(supabase: Client):
    print("Pruning news older than 7 days...")
    try:
        seven_days_ago = datetime.utcnow() - timedelta(days=7)
        seven_days_ago_iso = seven_days_ago.isoformat()
        res = supabase.table('noticias').delete().lt('created_at', seven_days_ago_iso).execute()
        print(f"Old news prune executed successfully. {len(res.data) if res.data else 0} removed.")
    except Exception as e:
        print(f"Error pruning old news: {e}")

def fetch_and_insert_news():
    print(f"Connecting to Supabase at {SUPABASE_URL}...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
    }
    
    total_inserted = 0
    
    for source in RSS_SOURCES:
        source_name = source["name"]
        feed_url = source["url"]
        scope = source["scope"]
        category = source["default_category"]
        
        print(f"Fetching from {source_name}...")
        
        try:
            response = requests.get(feed_url, headers=headers, timeout=10)
            if response.status_code != 200:
                print(f"Failed to fetch {source_name}: {response.status_code}")
                continue
                
            feed = feedparser.parse(response.content)
            entries = feed.entries[:10] 
            
            for entry in entries:
                title = entry.title
                link = entry.link
                
                # We no longer extract or assign image_url
                
                summary_html = entry.summary if hasattr(entry, 'summary') else ""
                summary = clean_summary(summary_html)
                
                # Duplicate check
                existing = supabase.table('noticias').select('id').eq('url', link).execute()
                if existing.data and len(existing.data) > 0:
                    print(f"Skipping duplicate: {title[:30]}...")
                    continue
                
                new_item = {
                    "title": title,
                    "category": category,
                    "summary": summary,
                    "source_name": source_name,
                    "url": link,
                    "scope": scope
                    # image_url left undefined / null
                }
                
                try:
                    res = supabase.table('noticias').insert(new_item).execute()
                    print(f"Inserted: {title[:30]}...")
                    total_inserted += 1
                except Exception as e:
                    print(f"Error inserting: {e}")
                    
        except Exception as e:
            print(f"Error processing feed {source_name}: {e}")
            
    print(f"Done! Inserted {total_inserted} new news items.")
    prune_old_news(supabase)

if __name__ == "__main__":
    fetch_and_insert_news()
