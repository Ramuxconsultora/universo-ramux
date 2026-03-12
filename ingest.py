import os
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

PERSIST_DIRECTORY = "./base_datos_normativa"
DOCS_DIR = "./processed_docs"

def ingest_docs():
    print(f"--- 🚀 INICIANDO INGESTIÓN DE DOCUMENTOS DESDE {DOCS_DIR} ---")
    
    if not os.path.exists(DOCS_DIR):
        print(f"⚠️ La carpeta {DOCS_DIR} no existe. Nada que ingestar.")
        return

    # 1. Configurar DB
    embeddings = FastEmbedEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    db = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings)

    # 2. Leer archivos MD
    files = [f for f in os.listdir(DOCS_DIR) if f.endswith(".md")]
    if not files:
        print("✅ No hay archivos Markdown nuevos para procesar.")
        return

    new_docs = []
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n## ", "\n### ", "\n#### ", "\n", " ", ""]
    )

    print(f"📚 Encontrados {len(files)} archivos.")

    for filename in files:
        file_path = os.path.join(DOCS_DIR, filename)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Metadata básica
            metadata = {"source": filename, "type": "markdown_import"}
            
            # Split
            chunks = text_splitter.create_documents([content], metadatas=[metadata])
            new_docs.extend(chunks)
            print(f"   📄 Procesado: {filename} ({len(chunks)} fragmentos)")
            
        except Exception as e:
            print(f"   ❌ Error leyendo {filename}: {e}")

    # 3. Guardar en DB
    if new_docs:
        print(f"💾 Guardando {len(new_docs)} fragmentos en la base de datos...")
        db.add_documents(new_docs)
        print("✅ ¡Ingestión completada con éxito!")
    else:
        print("⚠️ No se generaron fragmentos para guardar.")

if __name__ == "__main__":
    ingest_docs()
