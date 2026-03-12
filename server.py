from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings
from langchain_groq import ChatGroq
import os

app = Flask(__name__)
CORS(app) 

# --- CONFIGURACIÓN DE GROQ (CEREBRO EN LA NUBE) ---
# Consigue tu API KEY gratis en: https://console.groq.com/keys
# Pégala abajo donde dice "gsk_..."
GROQ_API_KEY = "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" 

print("--- 🧠 INICIALIZANDO GROQ (llama-3.3-70b) ... ---")
try:
    if GROQ_API_KEY == "gsk_...":
        print("⚠️  ADVERTENCIA: No has puesto tu API Key de Groq. El sistema no responderá.")
        print("    Edita server.py y pon tu clave en la línea de GROQ_API_KEY.")
        model = None
    else:
        model = ChatGroq(
            temperature=0, 
            model_name="llama-3.3-70b-versatile", 
            api_key=GROQ_API_KEY
        )
        print("--- ✅ GROQ CONECTADO ---")
except Exception as e:
    print(f"❌ ERROR AL CONECTAR CON GROQ: {e}")
    model = None

PERSIST_DIRECTORY = "./base_datos_normativa"
DB = None

def init_db():
    print("--- 🔄 C A R G A N D O   V E C T O R E S ... ---")
    try:
        if not os.path.exists(PERSIST_DIRECTORY):
            print(f"❌ ERROR: No encontré la carpeta '{PERSIST_DIRECTORY}'.")
            return
        # Usamos tus mismos embeddings
        embeddings = FastEmbedEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
        app.config['DB'] = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings)
        print("--- ✅ BASE DE DATOS LISTA ---")
    except Exception as e:
        print(f"❌ ERROR CRÍTICO al cargar DB: {e}")

init_db()

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "online", "message": "RAMUX AI Brain is Active"})

@app.route('/ask', methods=['POST'])
def ask():
    db = app.config.get('DB')
    if db is None: return jsonify({"error": "DB no cargada"}), 500

    data = request.json
    question = data.get('question', '')
    if not question: return jsonify({"error": "Falta la pregunta"}), 400

    print(f"🤔 Pregunta: {question}")

    # 1. RETRIEVAL (Lo que ya hacías: Buscar información)
    # Volvemos a k=12 o más, ya que Groq procesa rapidísimo
    results = db.similarity_search(question, k=15)
    
    # 2. CONTEXT BUILDING (Preparamos la "carpeta" de documentos para la IA)
    context_text = ""
    sources_used = set()

    for doc in results:
        source = os.path.basename(doc.metadata.get('source', 'Desconocido'))
        content = doc.page_content
        sources_used.add(source)
        # Etiquetamos si es Ley o Manual para que la IA sepa qué prioridad dar
        tipo = "LEY/NORMATIVA OFICIAL" if "LEY" in source.upper() or "DECRETO" in source.upper() else "DOCUMENTO DE APOYO"
        context_text += f"\n--- FUENTE: {source} ({tipo}) ---\n{content}\n"

    # 3. GENERATION (El paso nuevo: La IA escribe la respuesta)
    print("⚡ Enviando datos a Groq para redacción...")
    
    prompt = f"""
    Actúa como un experto consultor financiero y legal especializado en la CNV (Comisión Nacional de Valores).
    
    Tu OBJETIVO es responder a la pregunta del usuario basándote **ÚNICA Y EXCLUSIVAMENTE** en el contexto suministrado a continuación.
    
    PREGUNTA: "{question}"
    
    CONTEXTO (Base de Datos Oficial):
    {context_text}
    
    REGLAS ESTRICTAS DE RESPUESTA:
    1. **NO INVENTES NADA.** Si la información no está en el contexto, DEBES decir: "La información solicitada no se encuentra disponible en la base de datos normativa actual."
    2. **PRIORIDAD:** Basa tu respuesta en los documentos marcados como [LEY/NORMATIVA OFICIAL] si existen.
    3. **CITA OBLIGATORIA:** Cada afirmación debe estar respaldada mencionando la fuente (ej: "Según Ley 26.831...").
    4. **ESTRUCTURA:** Genera un artículo claro con títulos y subtítulos.
    5. No uses conocimientos generales externos que no estén en el contexto, salvo para definiciones básicas de diccionario. Los datos específicos (fechas, montos, artículos) deben salir del contexto.
    """

    try:
        if model:
            # LangChain ChatGroq devuelve un mensaje AIMessage
            response = model.invoke(prompt)
            ai_response = response.content
        else:
            ai_response = "❌ Error: Falta configurar la API Key de Groq en server.py"
    except Exception as e:
        ai_response = f"Error al generar respuesta con Groq: {e}"

    # Devolvemos la respuesta redactada + las fuentes para referencia
    return jsonify({
        "answer": ai_response,
        "sources": list(sources_used)
    })

# --- BIBLIOTECA DIGITAL API ---

# --- BIBLIOTECA DIGITAL API ---

@app.route('/api/documents', methods=['GET'])
def list_documents():
    """Lista todos los archivos .txt y .md en bibliografía y processed_docs."""
    documents = []
    
    # 1. Carpetas a escanear
    scan_dirs = [
        "Bibliografia examen de idoneidad 2",
        "processed_docs"
    ]
    
    import glob
    
    for root_dir in scan_dirs:
        if not os.path.exists(root_dir): continue
        
        # Patrones: .txt y .md recursivos
        files_txt = glob.glob(os.path.join(root_dir, "**", "*.txt"), recursive=True)
        files_md = glob.glob(os.path.join(root_dir, "**", "*.md"), recursive=True)
        all_files = files_txt + files_md
        
        for f in all_files:
            try:
                name = os.path.basename(f)
                if name.startswith('.'): continue
                
                # FILTROS
                upper_name = name.upper()
                if "BIBLIOGRAFIA EXAMEN" in upper_name: continue
                if "IDN CNV MODULO1" in upper_name: continue
                if "README" in upper_name: continue # Ignorar readmes
                
                size_kb = round(os.path.getsize(f) / 1024, 1)
                
                documents.append({
                    "name": name,
                    "path": f, # Path relativo
                    "size": f"{size_kb} KB",
                    "type": "MD" if f.endswith(".md") else "TXT"
                })
            except:
                pass
            
    # Ordenamiento
    def get_sort_priority(doc):
        name = doc['name'].upper()
        if "LEY" in name: return 1
        if "DECRETO" in name: return 2
        if doc['type'] == "MD": return 2.5 # Prioridad media a los nuevos docs
        return 3
        
    documents.sort(key=lambda x: (get_sort_priority(x), x['name']))
    return jsonify(documents)

@app.route('/api/document/content', methods=['GET'])
def get_document_content():
    """Devuelve el contenido de un archivo específico por nombre, buscando en todas las carpetas."""
    filename = request.args.get('name')
    if not filename:
        return jsonify({"error": "Falta el nombre del archivo"}), 400
        
    # Carpetas de búsqueda
    search_dirs = [
        "Bibliografia examen de idoneidad 2",
        "processed_docs"
    ]
    
    import glob
    target_path = None
    
    for root_dir in search_dirs:
        # Buscamos en txt y md
        files = glob.glob(os.path.join(root_dir, "**", "*"), recursive=True)
        for f in files:
            if os.path.basename(f) == filename:
                target_path = f
                break
        if target_path: break
            
    if not target_path:
        return jsonify({"error": "Archivo no encontrado"}), 404
        
    try:
        # Intentamos leer varias codificaciones
        for enc in ['utf-8', 'latin-1', 'cp1252']:
            try:
                with open(target_path, 'r', encoding=enc) as f:
                    content = f.read()
                return jsonify({"content": content, "encoding": enc, "path": target_path})
            except UnicodeDecodeError:
                continue
        return jsonify({"error": "No pude leer el archivo con ninguna codificación estándar"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)
