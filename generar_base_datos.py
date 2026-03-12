import os
import glob
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import FastEmbedEmbeddings
from langchain_community.vectorstores import Chroma

def cargar_documentos():
    print("--- INICIANDO PROCESO DE INGESTA DE NORMATIVA ---")
    
    # 1. Buscamos todo lo que termine en .txt en la carpeta correcta
    archivos = glob.glob("Bibliografia examen de idoneidad 2/*.txt")
    
    if not archivos:
        print("❌ ERROR: No encontré archivos .txt en la carpeta 'Bibliografia examen de idoneidad 2'.")
        return []

    print(f"📂 Se encontraron {len(archivos)} archivos de normativa.")
import re

def limpiar_texto(texto):
    # 1. Unir palabras cortadas por guion y salto de línea (ej: "están-\n dar" -> "estándar")
    texto = re.sub(r'(\w+)-\n\s*(\w+)', r'\1\2', texto)
    
    # 2. Reemplazar múltiples espacios y saltos de línea excesivos por un solo espacio
    # (Opcional: mantener saltos de párrafo si se desea, pero para embeddings suele ser mejor texto corrido o párrafos limpios)
    texto = re.sub(r'\s+', ' ', texto)
    
    # 3. Arreglar espacios faltantes después de puntuación (ej: "fin.Hola" -> "fin. Hola")
    texto = re.sub(r'([.,;:])([A-ZÁÉÍÓÚ])', r'\1 \2', texto)
    
    return texto.strip()

def cargar_documentos():
    print("--- INICIANDO PROCESO DE INGESTA DE NORMATIVA ---")
    
    # 1. Buscamos RECURSIVAMENTE (**) todo lo que termine en .txt
    root_dir = "Bibliografia examen de idoneidad 2"
    pattern = os.path.join(root_dir, "**", "*.txt")
    
    # recursive=True es necesario para que ** funcione
    archivos = glob.glob(pattern, recursive=True)
    
    if not archivos:
        print(f"❌ ERROR: No encontré archivos .txt en '{root_dir}' (buscando recursivamente).")
        return []

    # FILTRO DE EXCLUSIÓN
    # Excluimos "Bibliografia Examen Idoneo CNV.txt" y archivos ocultos/sistema
    archivos_filtrados = []
    
    archivos_ignorar = [
        "Bibliografia Examen Idoneo CNV.txt", # Pedido explícito del usuario
        "Bibliografia examen de idoneidad 2/Bibliografia Examen Idoneo CNV.txt" # Path completo por si acaso
    ]
    
    for arch in archivos:
        nombre_archivo = os.path.basename(arch)
        
        # Ignorar archivo si está en la lista negra
        if nombre_archivo in archivos_ignorar or arch in archivos_ignorar:
            print(f"🚫 Ignorando archivo excluido: {nombre_archivo}")
            continue
            
        # Ignorar archivos ocultos (empiezan con .)
        if nombre_archivo.startswith("."):
            continue
            
        archivos_filtrados.append(arch)

    print(f"📂 Se encontraron {len(archivos_filtrados)} archivos de normativa válidos.")
    
    docs_acumulados = []

    # 2. Leemos archivo por archivo
    for archivo in archivos_filtrados:
        try:
            # Intentamos leer con UTF-8
            loader = TextLoader(archivo, encoding="utf-8")
            raw_docs = loader.load()
            
            # Limpiamos el contenido de cada documento
            for doc in raw_docs:
                doc.page_content = limpiar_texto(doc.page_content)
                
            docs_acumulados.extend(raw_docs)
            print(f"   ✅ Leído y procesado: {archivo}")
        except Exception:
            try:
                # Si falla, probamos con Latin-1
                loader = TextLoader(archivo, encoding="latin-1")
                raw_docs = loader.load()
                
                # Limpiamos
                for doc in raw_docs:
                    doc.page_content = limpiar_texto(doc.page_content)
                    
                docs_acumulados.extend(raw_docs)
                print(f"   ✅ Leído (modo alternativo): {archivo}")
            except Exception as e:
                print(f"   ❌ ERROR FATAL leyendo {archivo}: {e}")

    return docs_acumulados

def crear_base_vectorial(documentos):
    if not documentos:
        print("No hay documentos para procesar.")
        return

    print("\n--- PROCESANDO INFORMACIÓN ---")
    
    # 3. Cortamos el texto en fichas de estudio (Chunks)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500, 
        chunk_overlap=100,
        separators=["\n\n", "\n", ". ", " ", ""] 
    )
    fragmentos = text_splitter.split_documents(documentos)
    print(f"🧩 Se generaron {len(fragmentos)} fragmentos de conocimiento.")

    # 4. Guardamos en la Base de Datos (ChromaDB)
    print("💾 Guardando en la 'Memoria Vectorial' (esto puede tardar unos segundos)...")
    
    # Esto crea la carpeta ./base_datos_normativa
    persist_dir = os.path.abspath("./base_datos_normativa")

    # [IMPORTANTE] Borrar la base de datos anterior para evitar duplicados y limpiar exclusiones
    if os.path.exists(persist_dir):
        import shutil
        print(f"🧹 Limpiando base de datos antigua en {persist_dir}...")
        shutil.rmtree(persist_dir)

    try:
        # Usamos FastEmbed con modelo MULTILINGÜE
        embeddings = FastEmbedEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2") 

        print(f"   📂 Directorio de persistencia: {persist_dir}")
        
        # Instanciamos primero
        db = Chroma(
            embedding_function=embeddings,
            persist_directory=persist_dir
        )
        
        # Agregamos los documentos en lotes (batching) para evitar timeouts si son muchos
        batch_size = 100  # Chroma sometimes chokes on huge inputs
        for i in range(0, len(fragmentos), batch_size):
            batch = fragmentos[i:i+batch_size]
            db.add_documents(batch)
            print(f"   ↳ Lote {i // batch_size + 1} agregado ({len(batch)} docs)")
            
        # Forcamos persistencia por si las dudas (aunque sea deprecated)
        # En versiones nuevas, add_documents persiste autom.
        if hasattr(db, 'persist'):
             db.persist()
        
        # Intentamos forzar persistencia (aunque en v0.4+ es auto)
        # db.persist() 
        
        count = db._collection.count()
        print(f"\n🎉 ¡LISTO! La 'Biblia' de la CNV ha sido creada exitosamente.")
        print(f"📊 Documentos indexados: {count}")
        print("Ahora tu IA podrá consultar la carpeta 'base_datos_normativa' usando FastEmbed.")
    except Exception as e:
        print(f"\n❌ ERROR al generar embeddings: {e}")

if __name__ == "__main__":
    docs = cargar_documentos()
    crear_base_vectorial(docs)