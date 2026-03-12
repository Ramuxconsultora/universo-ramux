import time
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import pymupdf4llm
from ingest import ingest_docs

# Configuration
WATCH_DIR = "./pdf_input"
OUTPUT_DIR = "./processed_docs"

class PDFHandler(FileSystemEventHandler):
    def __init__(self):
        print(f"👀 Watching {WATCH_DIR} for new PDFs...")

    def on_created(self, event):
        if event.is_directory:
            return
        
        filename = event.src_path
        if filename.lower().endswith(".pdf"):
            print(f"⚡ New PDF detected: {filename}")
            try:
                # Wait a brief moment to ensure file is fully written
                time.sleep(1)
                
                # Convert
                print(f"   🔄 Converting...")
                markdown_content = pymupdf4llm.to_markdown(filename)
                
                # Save to Output Dir
                base_name = os.path.basename(filename)
                name_without_ext = os.path.splitext(base_name)[0]
                output_path = os.path.join(OUTPUT_DIR, f"{name_without_ext}.md")
                
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(markdown_content)
                
                print(f"   ✅ Saved Markdown to: {output_path}")
                
                # Ingest into Vector DB
                print(f"   🧠 Ingesting into AI Vector DB...")
                ingest_docs()
                
            except Exception as e:
                print(f"   ❌ Error converting {filename}: {e}")

if __name__ == "__main__":
    # Ensure directories exist
    os.makedirs(WATCH_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    event_handler = PDFHandler()
    observer = Observer()
    observer.schedule(event_handler, WATCH_DIR, recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
