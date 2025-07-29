import { testNotes } from "./notas.js";

// 1. Grupos de notas (puedes añadir más arrays y zonas)
const groups = [
  { list: testNotes, zoneIndex: 0 },
  // { list: otrasNotas, zoneIndex: 1 }, etc.
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
    behavior: "instant",
  });
}

/**
 * Hace “explotar” todas las notas desde el centro a posiciones aleatorias.
 */
function estallarNotas() {
  allNotes.forEach(note => {
    const finalX = Math.random() * (canvas.offsetWidth - 400);
    const finalY = Math.random() * (canvas.offsetHeight - 400);

    setTimeout(() => {
      note.style.left = `${finalX}px`;
      note.style.top = `${finalY}px`;
      note.style.transform = "none";
      note.style.opacity = "1";
    }, 100);
  });
}

/**
 * Crea una nota en el DOM a partir de un HTML y la añade al canvas.
 * Devuelve el div creado.
 */
function crearNota(html, zoneIndex) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = html;
  note.dataset.zone = zoneIndex;

  // Posición inicial: centro del canvas, escala pequeña y opaca
  note.style.left = `${canvas.offsetWidth / 2}px`;
  note.style.top = `${canvas.offsetHeight / 2}px`;
  note.style.transform = "translate(-50%, -50%) scale(0.5)";
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
 */
async function cargarTodasLasNotas() {
  for (const { list, zoneIndex } of groups) {
    for (const url of list) {
      try {
        const res = await fetch(url);
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

// ---- PROCESO DE INICIO ----
centrarScrollCanvas();
cargarTodasLasNotas().then(() => {
  // Puedes ajustar el delay si quieres más efecto!
  setTimeout(() => {
    estallarNotas();
  }, 800);
});