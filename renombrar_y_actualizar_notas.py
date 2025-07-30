import os
import time
import re

# Configura tu carpeta de notas y archivo JS
NOTAS_DIR = "notas"
NOTAS_JS = "js/notas.js"  # cambia esto según la ubicación real de tu notas.js

def get_new_name(filepath):
    stat = os.stat(filepath)
    t = stat.st_ctime  # Para Mac, a veces es mejor usar st_birthtime si existe
    fecha = time.localtime(t)
    return time.strftime("%Y-%m-%d-%H%M.html", fecha)

# 1. Renombrar archivos y guardar el mapping antiguo->nuevo
mapping = {}
for nombre in os.listdir(NOTAS_DIR):
    if not nombre.endswith(".html"):
        continue
    fullpath = os.path.join(NOTAS_DIR, nombre)
    nuevo_nombre = get_new_name(fullpath)
    # Si ya existe un archivo con ese nombre, añade un sufijo (para evitar sobrescribir)
    i = 1
    base, ext = os.path.splitext(nuevo_nombre)
    while os.path.exists(os.path.join(NOTAS_DIR, nuevo_nombre)):
        nuevo_nombre = f"{base}-{i}{ext}"
        i += 1
    if nombre != nuevo_nombre:
        os.rename(fullpath, os.path.join(NOTAS_DIR, nuevo_nombre))
        print(f"Renombrado: {nombre} -> {nuevo_nombre}")
    mapping[nombre] = nuevo_nombre

# 2. Actualizar notas.js
with open(NOTAS_JS, "r", encoding="utf-8") as f:
    js_content = f.read()

# Reemplazar todos los nombres antiguos por los nuevos en los arrays
for old, new in mapping.items():
    # Usa re.escape por si hay caracteres raros en el nombre
    js_content = re.sub(
        rf'"{re.escape(old)}"', 
        f'"{new}"', 
        js_content
    )

with open(NOTAS_JS, "w", encoding="utf-8") as f:
    f.write(js_content)

print("¡Hecho! Archivos y arrays actualizados.")
