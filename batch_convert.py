import os
import pymupdf4llm
from ingest import ingest_docs

INPUT_DIR = "./pdf_input"
OUTPUT_DIR = "./processed_docs"

def batch_convert():
    print("--- 🔄 INICIANDO CONVERSIÓN MASIVA ---")
    
    if not os.path.exists(INPUT_DIR):
        print(f"❌ No existe {INPUT_DIR}")
        return

    files = [f for f in os.listdir(INPUT_DIR) if f.lower().endswith(".pdf")]
    
    print(f"📄 Encontrados {len(files)} PDFs.")
    
    for filename in files:
        input_path = os.path.join(INPUT_DIR, filename)
        
        # Output filename
        base_name = os.path.splitext(filename)[0]
        output_filename = f"{base_name}.md"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        
        # Check if already exists
        if os.path.exists(output_path):
            print(f"⏩ Saltando {filename} (ya existe MD)")
            continue
            
        try:
            print(f"   🔄 Convirtiendo {filename}...")
            markdown_content = pymupdf4llm.to_markdown(input_path)
            
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(markdown_content)
            
            print(f"   ✅ Generado: {output_filename}")
            
        except Exception as e:
            print(f"   ❌ Error en {filename}: {e}")

    print("--- 🧠 EJECUTANDO INGESTIÓN MASIVA ---")
    ingest_docs()

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    batch_convert()
