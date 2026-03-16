from PIL import Image
import os

# Rutas relativas al directorio del script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
INPUT_PATH = os.path.join(PROJECT_ROOT, 'public', 'ramux galactic.png')
OUTPUT_DIR = os.path.join(PROJECT_ROOT, 'public')

# Tamaños requeridos para web, iOS y Android
SIZES = {
    'favicon-16x16.png': (16, 16),
    'favicon-32x32.png': (32, 32),
    'apple-touch-icon.png': (180, 180),
    'android-chrome-192x192.png': (192, 192),
    'android-chrome-512x512.png': (512, 512)
}

def generate_icons():
    if not os.path.exists(INPUT_PATH):
        print(f"Error: No se encontró la imagen de origen en {INPUT_PATH}")
        return

    try:
        with Image.open(INPUT_PATH) as img:
            # Asegurarse de que la imagen sea RGBA
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            for name, size in SIZES.items():
                resized_img = img.resize(size, Image.Resampling.LANCZOS)
                output_path = os.path.join(OUTPUT_DIR, name)
                resized_img.save(output_path)
                print(f"Generado: {name} ({size[0]}x{size[1]})")
                
        print("\n¡Todos los íconos han sido generados exitosamente en la carpeta 'public/'!")
    except Exception as e:
        print(f"Error procesando la imagen: {e}")

if __name__ == "__main__":
    generate_icons()
