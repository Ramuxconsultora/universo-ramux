from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings
import os

PERSIST_DIRECTORY = "./base_datos_normativa"

def update_metadata():
    print(f"--- 🔄 Abriendo base de datos en {PERSIST_DIRECTORY} ---")
    
    # 1. Inicializar DB
    embeddings = FastEmbedEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    db = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings)
    
    # 2. Obtener todos los documentos (o iterar si es posible, pero Chroma API es limitada en langchain)
    # Langchain Chroma no tiene un método directo "update_metadata" masivo fácil.
    # Pero podemos hacer un `get` para ver los IDs y Metadatos.
    
    print("--- 🕵️ Buscando entradas con el nombre antiguo ---")
    existing = db.get() # Trae IDs, metadatos, documentos
    
    ids_to_update = []
    metadatas_to_update = []
    
    count = 0
    old_name_part = "19550 - SOCIEDADES COMERCIALES.txt"
    new_name_part = "Ley 19550 - SOCIEDADES COMERCIALES.txt"
    
    for i, meta in enumerate(existing['metadatas']):
        source = meta.get('source', '')
        if old_name_part in source and "Ley" not in source: # Evitar doble renombrado si ya tiene Ley
            # Encontramos uno!
            new_source = source.replace(old_name_part, new_name_part)
            
            # Guardamos para update
            ids_to_update.append(existing['ids'][i])
            
            # Copiamos metadatos y actualizamos
            new_meta = meta.copy()
            new_meta['source'] = new_source
            metadatas_to_update.append(new_meta)
            
            count += 1
            
    if count == 0:
        print("✅ No se encontraron registros con el nombre antiguo. Todo parece estar bien.")
        return

    print(f"--- 📝 Actualizando {count} registros en la base de datos ---")
    
    # Chroma update
    # Langchain wrapper: db.update_documents? No siempre expuesto.
    # Usamos el cliente nativo de chroma expuesto por langchain si es posible, o add_texts con ids.
    # Update directo: db._collection.update(ids=..., metadatas=...)
    
    try:
        db._collection.update(
            ids=ids_to_update,
            metadatas=metadatas_to_update
        )
        print("--- ✅ Actualización exitosa ---")
    except Exception as e:
        print(f"❌ Error al actualizar DB: {e}")

if __name__ == "__main__":
    update_metadata()
