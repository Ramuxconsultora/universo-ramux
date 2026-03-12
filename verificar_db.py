from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings
import chromadb

PERSIST_DIRECTORY = "./base_datos_normativa"

def verificar():
    print("--- 🕵️ VERIFICANDO BASE DE DATOS ---")
    
    # 1. Check raw count
    try:
        # Chroma client direct access to check raw counts
        client = chromadb.PersistentClient(path=PERSIST_DIRECTORY)
        collection = client.get_or_create_collection("langchain") # Langchain uses 'langchain' by default
        count = collection.count()
        print(f"📊 Cantidad de fragmentos en la DB: {count}")
        
        if count == 0:
            print("⚠️ LA BASE DE DATOS ESTÁ VACÍA.")
            return

        # 2. Check content via Langchain
        embeddings = FastEmbedEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
        db = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings)
        
        print("\n🔎 Probando búsqueda de prueba: 'fondos comunes'")
        results = db.similarity_search("fondos comunes", k=3)
        
        if not results:
            print("❌ No se encontraron resultados para la búsqueda.")
        else:
            print(f"✅ Se encontraron {len(results)} resultados.")
            for i, doc in enumerate(results):
                source = doc.metadata.get('source', 'Desconocido')
                print(f"   result[{i}] source: {source}")
                print(f"   result[{i}] snippet: {doc.page_content[:100]}...")

    except Exception as e:
        print(f"❌ Error al verificar: {e}")

if __name__ == "__main__":
    verificar()
