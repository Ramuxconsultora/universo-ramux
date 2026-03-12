
import requests
import feedparser

def test_feed():
    url = "https://news.google.com/rss/search?q=Merval+Argentina+Finanzas&hl=es-419&gl=AR&ceid=AR:es-419"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        feed = feedparser.parse(response.content)
        print(f"Status Code: {response.status_code}")
        print(f"Feed Entries: {len(feed.entries)}")
        
        if len(feed.entries) > 0:
            print(f"First Entry: {feed.entries[0].title}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_feed()
