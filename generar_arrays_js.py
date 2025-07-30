import os

# Carpeta raíz (donde están todas tus subcarpetas de notas)
BASE_DIR = "."
# Nombre del archivo JS que se va a generar
OUTPUT_FILE = "notas.js"

with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
    for carpeta in sorted(os.listdir(BASE_DIR)):
        if os.path.isdir(carpeta) and not carpeta.startswith('.'):
            archivos_html = [
                f"{carpeta}/{f}"
                for f in sorted(os.listdir(os.path.join(BASE_DIR, carpeta)))
                if f.endswith(".html")
            ]
            if archivos_html:
                # Nombre del array: quito caracteres no válidos para JS
                nombre_array = carpeta.replace(" ", "_").replace("-", "_")
                out.write(f"export const {nombre_array} = [\n")
                for html in archivos_html:
                    out.write(f'  "{html}",\n')
                out.write("];\n\n")
print(f"✅ Archivo {OUTPUT_FILE} generado con todos los arrays de notas.")
