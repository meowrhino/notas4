# TODO actualizado - Notas 4

## ✅ Completado

- [x] Estructura base (`index.html`, `style.css`, `app.js`, carpeta `notas/`)
- [x] Multi-zona y multi-array con `notas.js` modular
- [x] Botón "Ir al centro": centra canvas, desbloquea flujo
- [x] Botón "Cargar notas": animación tipo error Windows, apilado caótico en viewer
- [x] Botón "Dispersar": notas saltan a su zona, zonas pastel no solapadas, nunca en el centro
- [x] Delay en la dispersión y transición animada
- [x] Notas pequeñas de base, crecen al hover (`scale`)
- [x] Zonas de color pastel, proporcionales al nº de notas
- [x] Drag & drop en notas (mouse/touch)
- [x] Modularidad: `crearNota`, `habilitarDragDrop`, `estallarNotas`, `cargarNotasCaoticas`, etc.
- [x] Refactor de delays/tamaños para experiencia óptima
- [x] Script Python para generar y renombrar notas automáticamente
- [x] Validación de nombres/errores 404 en carga
- [x] El centro del canvas siempre libre para ver el "estallido"
- [x] Scroll y overflow en notas largas (popup y hover)

---

## 🟡 Mejoras en marcha o ideas para iterar

- [ ] **Popup al hacer click en nota (overlay)**
  - [ ] Event listener en cada nota para abrir el popup
  - [ ] Cerrar popup con click fuera o tecla Escape
  - [ ] Overlay `.overlay` para visualización bonita
- [ ] Modularizar la cascada inicial como función reutilizable
- [ ] Añadir animación de entrada en cascada (no solo apilado)
- [ ] Chequear colisión en la cascada para 100+ notas
- [ ] Menú flotante para navegar zonas (scrollTo cada zona)
- [ ] Responsive real: adaptar canvas/notas a móvil/tablet
- [ ] Permitir scroll centrado al recargar o link directo
- [ ] Permitir reordenar zonas (drag & drop de grupos/arrays)
- [ ] Cambiar forma de zonas (círculos/blobs) para más caos visual
- [ ] Guardar posiciones personalizadas de usuario (opcional)
- [ ] Mejorar estilos de notas grandes para dark mode
- [ ] Refactor y comentarios finales para open-source

---

## 🛠️ Notas técnicas y hacks

- Las zonas nunca ocupan el centro del canvas, para lucir la animación de dispersión
- El tamaño de zona es ajustable en `generarZonasSinSolape`
- Notas y popup usan `overflow: auto` para contenido largo
- Los arrays/grupos se pueden añadir sin tocar la lógica core
- Puedes tunear el delay de dispersión a tu gusto

---

## 💡 Siguientes pasos recomendados

1. Terminar el popup al click en nota y overlay
2. Modularizar la cascada inicial como función exportable
3. Implementar menú de navegación de zonas
4. Probar con muchas notas y pulir UX en móvil
5. (Opcional) Experimentar con zonas tipo blob usando SVG/clip-path

---
