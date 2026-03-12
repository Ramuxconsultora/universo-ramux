import os
import glob
import time
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import FastEmbedEmbeddings
import chromadb
from chromadb.config import Settings

# Config
PERSIST_DIRECTORY = os.path.abspath("./base_datos_normativa")
BATCH_SIZE = 20

def run():
    print("--- 🚀 INICIANDO GENERACIÓN MANUAL ---")
    
    # 1. Load Files
    archivos = glob.glob("Bibliografia examen de idoneidad 2/*.txt")
    print(f"📂 Archivos encontrados: {len(archivos)}")
    
    docs_acumulados = []
    for archivo in archivos:
        try:
            loader = TextLoader(archivo, encoding="utf-8")
            docs_acumulados.extend(loader.load())
        except:
            try:
                loader = TextLoader(archivo, encoding="latin-1")
                docs_acumulados.extend(loader.load())
            except Exception as e:
                print(f"Error reading {archivo}: {e}")

    # 2. Split
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, 
        chunk_overlap=200,
        separators=["\n\n", "\n", " ", ""]
    )
    all_splits = text_splitter.split_documents(docs_acumulados)
    print(f"🧩 Total de fragmentos: {len(all_splits)}")

    # 3. Setup Client & Embedding
    print("🔌 Inicializando FastEmbed y Chroma Client...")
    
    # Embedder
    embedder = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")
    
    # Chroma Client
    client = chromadb.PersistentClient(path=PERSIST_DIRECTORY)
    collection = client.get_or_create_collection("langchain") # Langchain default naming
    
    # 4. Batch Process
    total = len(all_splits)
    print("⚡️ Comenzando procesamiento por lotes...")
    
    batch_texts = []
    batch_metadatas = []
    batch_ids = []
    
    for i, doc in enumerate(all_splits):
        batch_texts.append(doc.page_content)
        # Fix metadata: ensure values are str/int/float/bool
        safe_metadata = {}
        for k, v in doc.metadata.items():
            if isinstance(v, (str, int, float, bool)):
                safe_metadata[k] = v
            else:
                safe_metadata[k] = str(v)
        batch_metadatas.append(safe_metadata)
        batch_ids.append(f"doc_{i}")
        
        if len(batch_texts) >= BATCH_SIZE:
            try:
                # Embed keys
                # print(f"   Embedding batch {i-BATCH_SIZE+1} to {i}...")
                embeddings = embedder.embed_documents(batch_texts)
                
                # Add to DB
                collection.add(
                    documents=batch_texts,
                    embeddings=embeddings,
                    metadatas=batch_metadatas,
                    ids=batch_ids
                )
                print(f"   ✅ Batch procesado hasta doc {i+1}/{total}")
            except Exception as e:
                print(f"   ❌ Error en batch: {e}")
            
            # Reset batch
            batch_texts = []
            batch_metadatas = []
            batch_ids = []

    # Process remaining
    if batch_texts:
        try:
            embeddings = embedder.embed_documents(batch_texts)
            collection.add(
                documents=batch_texts,
                embeddings=embeddings,
                metadatas=batch_metadatas,
                ids=batch_ids
            )
            print(f"   ✅ Último batch procesado. Total: {total}")
        except Exception as e:
             print(f"   ❌ Error en último batch: {e}")

    print(f"🎉 FINALIZADO. Documentos en DB: {collection.count()}")

if __name__ == "__main__":
    run()
