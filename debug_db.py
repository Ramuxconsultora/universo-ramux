from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings
import os

PERSIST_DIRECTORY = "./base_datos_normativa"

def inspect_db():
    if not os.path.exists(PERSIST_DIRECTORY):
        print("No DB found")
        return

    embeddings = FastEmbedEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    db = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings)
    
    print(f"DB Collection Count: {db._collection.count()}")
    
    # Try to find the specific Law file
    # Chroma doesn't allow direct SQL-like querying of metadata easily without getting all IDs, 
    # but we can search for the specific phrase and see the metadata.
    
    query = "Registro Unico de Personal"
    results = db.similarity_search(query, k=10)
    
    print(f"\nSearching for: '{query}'")
    for i, doc in enumerate(results):
        source = doc.metadata.get('source', 'UNKNOWN')
        print(f"[{i+1}] Source: {os.path.basename(source)}")
        print(f"    Content Preview: {doc.page_content[:100]}...")
        print("-" * 40)

if __name__ == "__main__":
    inspect_db()
