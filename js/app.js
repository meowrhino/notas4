import { baja, escritos, historias, lecturas, notas_4, suenos, ideas_actuales } from "./notas.js";

window.addEventListener("DOMContentLoaded", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
});

// 1. Grupos de notas (puedes añadir más arrays y zonas)
const groups = [
  { list: baja, zoneIndex: 0, name: "baja" },
  { list: escritos, zoneIndex: 1, name: "escritos" },
  { list: historias, zoneIndex: 2, name: "historias" },
  { list: lecturas, zoneIndex: 3, name: "lecturas" },
  { list: notas_4, zoneIndex: 4, name: "notas_4" },
  { list: suenos, zoneIndex: 5, name: "suenos" },
  { list: ideas_actuales, zoneIndex: 6, name: "ideas_actuales" },
];



const canvas = document.getElementById("canvas");
const allNotes = [];

/**
 * Centra el scroll en el canvas.
 */
function centrarScrollCanvas() {
  const centerX = canvas.offsetWidth / 2;
  const centerY = canvas.offsetHeight / 2;
  window.scrollTo({
    top: centerY - window.innerHeight / 2,
    left: centerX - window.innerWidth / 2,
    behavior: "smooth",
  });
}

/**
 * Hace “explotar” todas las notas desde el centro a posiciones aleatorias.
 */
// function estallarNotas() {
//   allNotes.forEach(note => {
//     const finalX = Math.random() * (canvas.offsetWidth - 400);
//     const finalY = Math.random() * (canvas.offsetHeight - 400);

//     setTimeout(() => {
//       note.style.left = `${finalX}px`;
//       note.style.top = `${finalY}px`;
//       //note.style.transform = "none";
//       note.style.opacity = "1";
//     }, 100);
//   });
// }

function estallarNotas() {
  allNotes.forEach(note => {
    // Explota a cualquier sixtio del canvas (puedes limitar más si prefieres)
    const canvasW = canvas.offsetWidth, canvasH = canvas.offsetHeight;
    const noteW = note.offsetWidth || 240;
    const noteH = note.offsetHeight || 120;
    const finalX = Math.random() * (canvasW - noteW);
    const finalY = Math.random() * (canvasH - noteH);
    setTimeout(() => {
      note.style.left = `${finalX}px`;
      note.style.top = `${finalY}px`;
      // NO cambies el scale ni la opacidad
    }, 100);
  });
}



/**
 * Crea una nota en el DOM a partir de un HTML y la añade al canvas.
 * Devuelve el div creado.
 */
function crearNota(html, zoneIndex, arrayName) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = html;
  note.dataset.zone = zoneIndex;

  // Si arrayName existe, añádelo como clase
if (arrayName && arrayName.length > 0) note.classList.add(arrayName);

  // Posición inicial: centro del canvas, escala pequeña y opaca
  note.style.left = `${canvas.offsetWidth / 2}px`;
  note.style.top = `${canvas.offsetHeight / 2}px`;
  //note.style.transform = "scale(0.8)"; // Sólo esto, sin translate
  note.style.opacity = "0";


  canvas.appendChild(note);

  // Activar drag & drop (táctil y ratón)
  habilitarDragDrop(note);

  return note;
}

/**
 * Añade drag & drop básico a una nota (soporta touch y mouse).
 */
function habilitarDragDrop(note) {
  let offsetX, offsetY;
  let dragging = false;

  note.addEventListener("mousedown", (e) => {
    dragging = true;
    offsetX = e.clientX - note.offsetLeft;
    offsetY = e.clientY - note.offsetTop;
    note.classList.add("dragging");
  });

  window.addEventListener("mousemove", (e) => {
    if (dragging) {
      note.style.left = `${e.clientX - offsetX}px`;
      note.style.top = `${e.clientY - offsetY}px`;
    }
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
    note.classList.remove("dragging");
  });

  // Móvil
  note.addEventListener("touchstart", (e) => {
    dragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - note.offsetLeft;
    offsetY = touch.clientY - note.offsetTop;
    note.classList.add("dragging");
  });

  window.addEventListener("touchmove", (e) => {
    if (dragging) {
      const touch = e.touches[0];
      note.style.left = `${touch.clientX - offsetX}px`;
      note.style.top = `${touch.clientY - offsetY}px`;
    }
  });

  window.addEventListener("touchend", () => {
    dragging = false;
    note.classList.remove("dragging");
  });
}

/**
 * Carga todas las notas de todos los grupos y las añade al canvas.
 * Devuelve una promesa que se resuelve cuando se han añadido todas.

async function cargarTodasLasNotas() {
  for (const { list, zoneIndex } of groups) {
    for (const url of list) {
      try {
        const res = await fetch("notas/" + url); // así busca dentro de la carpeta notas
        if (!res.ok) throw new Error("No se pudo cargar: " + url);
        const html = await res.text();
        const note = crearNota(html, zoneIndex);
        allNotes.push(note);
      } catch (err) {
        console.warn(err);
      }
    }
  }
}
   */




// --- FUNCIONES PARA CASCADA INICIAL --- //

// Calcula el tamaño real de la nota (ancho y alto)
function calculateNoteSize(noteEl) {
  // Hacemos visible la nota para poder medirla (necesario al principio)
  noteEl.style.opacity = "0";
  noteEl.style.transform = "scale(1)";
  noteEl.style.left = "-9999px";
  noteEl.style.top = "-9999px";
  noteEl.style.display = "block";
  // Forzamos un reflow para obtener las dimensiones reales
  const rect = noteEl.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

// Comprueba si una posición está libre (colisión AABB)
function canPlace(x, y, w, h, placedRects) {
  for (const rect of placedRects) {
    if (
      x < rect.x + rect.w &&
      x + w > rect.x &&
      y < rect.y + rect.h &&
      y + h > rect.y
    ) {
      return false; // Se solapan
    }
  }
  return true; // Sitio libre
}

// Busca una posición válida en la zona de cascada (en bloque centrado)
function findCascadePosition(size, placedRects, canvasWidth, canvasHeight) {
  const padding = 12;
  const cols = Math.floor((canvasWidth - padding * 2) / (size.width + padding));
  let x0 = (canvasWidth - (cols * (size.width + padding))) / 2 + padding;
  let y0 = canvasHeight / 2 - 100;
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < cols; col++) {
      let x = x0 + col * (size.width + padding);
      let y = y0 + row * (size.height + padding);
      if (canPlace(x, y, size.width, size.height, placedRects)) {
        return { x, y };
      }
    }
  }
  // Si no hay sitio, amontona abajo
  return { x: x0, y: y0 + 10 * (size.height + padding) };
}

// Función principal: renderiza la cascada de notas
async function renderCascade() {
  const canvasWidth = canvas.offsetWidth;
  const canvasHeight = canvas.offsetHeight;
  const placedRects = [];

  // Coloca cada nota en su sitio, animando la entrada
  for (const note of allNotes) {
    // Haz visible la nota para poder medirla
    note.style.opacity = "0";
    //note.style.transform = "scale(0.5)";
    note.style.left = `${canvasWidth / 2}px`;
    note.style.top = `${canvasHeight / 2}px`;

    // Espera un frame para asegurar que la nota está en el DOM
    await new Promise(r => setTimeout(r, 0));
    const size = calculateNoteSize(note);

    // Busca posición válida
    const pos = findCascadePosition(size, placedRects, canvasWidth, canvasHeight);

    // Anima la nota a su sitio
    note.style.transition = "all 0.5s cubic-bezier(.25,.8,.25,1)";
    note.style.left = `${pos.x}px`;
    note.style.top = `${pos.y}px`;
    //note.style.transform = "none";
    note.style.opacity = "1";

    // Marca la posición ocupada
    placedRects.push({ x: pos.x, y: pos.y, w: size.width, h: size.height });
  }

  // Cuando acaba, habilita el botón "Dispersar"
  btnScatter.disabled = false;
}
// Botones globales
const btnCenter = document.getElementById("btnCenter");
const btnLoad = document.getElementById("btnLoad");
const btnScatter = document.getElementById("btnScatter");

// Estado inicial: solo activo "Ir al centro"
btnCenter.disabled = false;
btnLoad.disabled = true;
btnScatter.disabled = true;

// Botón "Ir al centro"
btnCenter.addEventListener("click", () => {
  centrarScrollCanvas();
  btnCenter.disabled = true;
  btnLoad.disabled = false;
  btnScatter.disabled = true;
});

// Botón "Cargar notas"
btnLoad.addEventListener("click", async () => {
  btnLoad.disabled = true;
  await cargarNotasCaoticas(); // Aquí la función caótica que haremos después
  btnScatter.disabled = false;
});

// Botón "Dispersar"
btnScatter.addEventListener("click", () => {
  estallarNotas();
  btnScatter.disabled = true;
});



async function cargarNotasCaoticas() {
  // Elimina las notas anteriores
  allNotes.forEach(note => note.remove());
  allNotes.length = 0;

  // Calcula el área visible del viewport DENTRO del canvas
  const viewLeft = window.scrollX;
  const viewTop = window.scrollY;
  const viewW = window.innerWidth;
  const viewH = window.innerHeight;

  // Parámetros para el efecto “ventanas apiladas caóticas”
  let offsetX = 0, offsetY = 0, offsetStep = 22;
  let lastX = null, lastY = null;

  for (const { list, zoneIndex } of groups) {
    for (const url of list) {
      let html;
      try {
        const res = await fetch("notas/" + url);
        if (!res.ok) throw new Error("No se pudo cargar: " + url);
        html = await res.text();
      } catch (err) {
        console.warn(err);
        continue;
      }
    const note = crearNota(html, zoneIndex, name);
      allNotes.push(note);

      // Tamaño de la nota
      let noteW = note.offsetWidth || 240;
      let noteH = note.offsetHeight || 120;

      // Si hay una anterior, la siguiente aparece offseteada (tipo ventanas apiladas), si no, random en viewport
      let left, top;
      if (lastX !== null && lastY !== null &&
        lastX + offsetStep + noteW < viewLeft + viewW &&
        lastY + offsetStep + noteH < viewTop + viewH) {
        left = lastX + offsetStep;
        top = lastY + offsetStep;
      } else {
        // Random dentro del viewport visible
        left = viewLeft + Math.random() * (viewW - noteW);
        top = viewTop + Math.random() * (viewH - noteH);
      }
      note.style.left = `${left}px`;
      note.style.top = `${top}px`;
      note.style.opacity = "1";
      //note.style.transform = "scale(0.8)";

      lastX = left;
      lastY = top;
      await new Promise(r => setTimeout(r, 26)); // Delay para el efecto visual
    }
  }
}



function isCanvasCentered() {
  const centerX = canvas.offsetWidth / 2;
  const centerY = canvas.offsetHeight / 2;
  const scrollX = window.scrollX + window.innerWidth / 2;
  const scrollY = window.scrollY + window.innerHeight / 2;
  // Margen de 20 píxeles
  return Math.abs(centerX - scrollX) < 20 && Math.abs(centerY - scrollY) < 20;
}

// Añade este check al evento de scroll
window.addEventListener("scroll", () => {
  btnCenter.disabled = isCanvasCentered();
});

// Al iniciar, fuerza el estado correcto
btnCenter.disabled = isCanvasCentered();



function defineZones(n) {
  // Divide el canvas en n columnas iguales
  const zones = [];
  const padding = 40;
  const canvasW = canvas.offsetWidth, canvasH = canvas.offsetHeight;
  const zoneW = (canvasW - padding * (n + 1)) / n;
  for (let i = 0; i < n; i++) {
    zones.push({
      x: padding + i * (zoneW + padding),
      y: padding,
      w: zoneW,
      h: canvasH - 2 * padding,
    });
  }
  return zones;
}
