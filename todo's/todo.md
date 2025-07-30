# TODO

## 🆕 Flujo caótico tipo "Windows error" (multi-zona y multi-botón)

### 0. Estructura y UX de botones
- [x] Crear botón "Ir al centro" (siempre visible al cargar)
- [x] Al pulsar "Ir al centro", centrar canvas y mostrar botón "Cargar notas"
- [x] Desactivar los demás botones hasta haber ido al centro
- [x] Crear botón "Cargar notas" (visible solo tras ir al centro)
- [-] Eliminar/ocultar "Cargar notas" al terminar la carga caótica
- [-] Crear función genérica para eliminar un botón (por id/clase)
- [x] Botón "Dispersar" solo visible/habilitado tras cargar todas las notas

### 1. Algoritmo de aparición caótica de notas
- [x] Implementar función para elegir posición random válida dentro de la zona asignada a cada array
- [x] Añadir offset de apilado (como ventanas error: +x, +y por nota, pero sin salirse de la zona)
- [ ] Chequear que no se solapan ni se salen del canvas
- [ ] Si no cabe, volver a probar otra posición (hasta X intentos)
- [x] Mostrar animación al aparecer cada nota y delay entre cada una (`async/await`)
- [ ] Soportar varios arrays de notas, cada uno en su zona (el array define la zona)
- [x] Al terminar todas, habilitar botón "Dispersar"

### 2. Gestión de zonas (para cuando haya varios arrays)
- [x] Definir función `defineZones(nZones)` (divide el canvas en columnas según número de arrays)
- [ ] Asignar a cada nota su zona según el array de origen (usando `dataset.zone`)
- [ ] Asegurar que cada nota solo se posiciona en su zona

### 3. Refactor y modularidad
- [x] Modularizar la lógica de botones (mostrar, ocultar, eliminar, habilitar, deshabilitar)
- [ ] Modularizar el algoritmo de aparición random + offset (para reutilizar)
- [ ] Dejar preparado para que al añadir nuevos arrays en `notas.js`, todo funcione igual

---

### (Puedes dejar el resto del TODO debajo, marcando lo anterior como obsoleto si lo sustituyes por este nuevo flujo)


- [x] **Preparar estructura base del proyecto**
  - [x] Crear `index.html`, enlazar `style.css` y `app.js`
  - [x] Crear carpeta `notes/` con HTMLs de prueba
  - [x] Añadir `<div id="canvas"></div>` en el HTML
- [x] **Estilos base**
  - [x] Definir `#canvas` (position, tamaño grande, overflow)
  - [x] Añadir botón flotante “Dispersar” (aún sin funcionalidad)
- [x] **Carga y despliegue inicial de notas**
  - [x] Exportar arrays de rutas desde `notas.js` (permite colecciones múltiples)
  - [x] Cargar cada nota vía `fetch`, insertar en el DOM
  - [x] Modularizar: función `crearNota()`, función `habilitarDragDrop()`
  - [x] Guardar todas las notas en `allNotes`
  - [x] Centrar el scroll del canvas al cargar la página
- [x] **Animación y dispersión (“estallido” de notas)**
  - [x] Mostrar todas las notas centradas al principio
  - [x] Animar el “estallido” de notas después de un delay programable
  - [x] Modularizar: función `estallarNotas()`
- [x] **Modularidad y comentarios**
  - [x] Comentar todas las funciones clave
  - [x] Extraer toda la lógica reutilizable fuera del bucle principal
  - [x] Dejar ready para añadir más colecciones/zones en el futuro
- [ ] **Cascada inicial y posicionamiento no aleatorio**
  - [ ] Implementar función `calculateNoteSize(noteEl)`
  - [ ] Calcular posiciones válidas en “cascada” (no solapan)
  - [ ] Implementar `canPlace(x, y, w, h, placedRects)` para colisiones
  - [ ] Implementar `findCascadePosition(size, placedRects)`
  - [ ] Modularizar: función `renderCascade()`
  - [ ] Añadir transición/animación de entrada en cascada
  - [ ] Habilitar el botón “Dispersar” al terminar la cascada
- [ ] **Gestión de zonas/colecciones**
  - [ ] Definir función `defineZones(nZones)`
  - [ ] Permitir a las notas dispersarse solo en su zona correspondiente
  - [ ] Visualizar zonas en el canvas (opcional)
- [ ] **Dispersión aleatoria posterior**
  - [ ] Implementar función `scatterNotes()` para dispersar notas en zona
  - [ ] Vincular botón “Dispersar” a esta función
- [ ] **Interacciones y UX**
  - [ ] Implementar pop-up al hacer click en una nota (verla grande)
  - [ ] Permitir cerrar el pop-up fácilmente (esc, click fuera, botón)
  - [ ] Hacer responsive el canvas y las notas en móvil
  - [ ] Permitir arrastrar y soltar notas en móvil y escritorio
- [ ] **Pruebas y control de calidad**
  - [ ] Verificar carga y dispersión de 10, 50, 200 notas
  - [ ] Probar UX en móvil, tablet y escritorio
  - [ ] Revisar scroll centrado al recargar o entrar por link directo
  - [ ] Medir tiempo de carga y optimizar si es necesario
- [ ] **Refactor y limpieza**
  - [ ] Revisar y limpiar código muerto/comentado
  - [ ] Mejorar nombres de variables y funciones si es necesario
  - [ ] Revisar y mejorar comentarios
  - [ ] Preparar documentación de uso interno
# TODO

## ✅ Completado
- [x] Preparar estructura base del proyecto
- [x] Enlazar `index.html`, `style.css` y `app.js`
- [x] Crear carpeta `notes/` con HTMLs de prueba
- [x] Añadir `<div id="canvas"></div>` y botón `<button id="btnScatter">Dispersar</button>`
- [x] Definir estilos base de `#canvas` y botón flotante
- [x] Exportar rutas desde `notas.js` y modularizar array de notas
- [x] Implementar carga de notas con `fetch` y funciones `crearNota()` y `habilitarDragDrop()`
- [x] Centrar scroll del canvas al cargar
- [x] Implementar animación de "estallido" (`estallarNotas()`) y delay programable

## 🔄 Pendientes inmediatos

### 0. Manejo del botón Dispersar (UX controlada)
- [x] Quitar la dispersión automática tras la carga
- [x] Habilitar el botón `#btnScatter` cuando cargan todas las notas
- [x] Al hacer click, lanzar `estallarNotas()`
- [x] Deshabilitar el botón tras usarlo (opcional, pero implementado)


### 1. Cascada inicial de notas
- [ ] Crear función `calculateNoteSize(noteEl)`
- [ ] Inicializar array `placedRects = []`
- [ ] Implementar `canPlace(x, y, w, h, placedRects)` (colisión AABB)
- [ ] Implementar `findCascadePosition(size, placedRects)`
- [ ] Escribir función `renderCascade()` que:
  - [ ] Inserte cada nota con estilo inicial (scaled, opacity 0)
  - [ ] Use `calculateNoteSize` y `findCascadePosition` para posicionar
  - [ ] Añada la nota al DOM
  - [ ] Dispare transición CSS a tamaño real y opacity 1
- [ ] Habilitar el botón “Dispersar” al terminar la cascada

### 2. Dispersión por zonas
- [ ] Definir función `defineZones(nZones)`
  - [ ] Dividir canvas en `nZones` columnas iguales
- [ ] Escribir `scatterNotes()` que:
  - [ ] Obtenga zonas con `defineZones`
  - [ ] Recorra `allNotes`, lea `note.dataset.zoneIndex`
  - [ ] Calcule posición aleatoria dentro de su zona
  - [ ] Actualice `style.left`/`style.top` para animar
- [ ] Enlazar `scatterNotes()` al botón `#btnScatter`

### 3. Interacciones y UX
- [ ] Añadir event listener a cada nota para mostrar pop-up
- [ ] Crear overlay `.overlay` para visualizar nota completa
- [ ] Incluir botón cerrar en el overlay
- [ ] Permitir cerrar overlay con click fuera y tecla Escape
- [ ] Asegurar drag & drop responsive en móvil y escritorio

### 4. Modularidad, refactor y documentación
- [ ] Refactorizar `cargarTodasLasNotas()` para paralelizar con `Promise.all`
- [ ] Extraer constantes (márgenes, pasos) en configuración global
- [ ] Renombrar arrays en `notas.js` a nombres semánticos (ej. `personalNotes`)
- [ ] Añadir comentarios JSDoc a todas las funciones
- [ ] Escribir README.md con instrucciones de instalación y uso

### 5. Pruebas y scripts auxiliares
- [ ] Probar carga y animaciones con 10, 50 y 200 notas
- [ ] Verificar funcionamiento en móvil, tablet y escritorio
- [ ] Medir y optimizar tiempos de carga si es necesario
- [ ] Crear script Python para generar automáticamente `notas.js`