const notes = [
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
  "2024-08-01-1409.html",
  "2024-08-02-0304.html",
  "2024-08-04-1651.html",
];

const canvas = document.getElementById("canvas");
const centerX = canvas.offsetWidth / 2;
const centerY = canvas.offsetHeight / 2;

// Mover scroll al centro del canvas
window.scrollTo({
  top: centerY - window.innerHeight / 2,
  left: centerX - window.innerWidth / 2,
  behavior: "instant",
});

notes.forEach(async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("No se pudo cargar: " + url);
    const html = await res.text();

    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = html;

    // posición inicial (centro de canvas)
    note.style.left = `${centerX}px`;
    note.style.top = `${centerY}px`;
    note.style.transform = "translate(-50%, -50%) scale(0.5)";
    note.style.opacity = "0";

    canvas.appendChild(note);

    // posición destino (aleatoria)
    const finalX = Math.random() * (canvas.offsetWidth - 400);
    const finalY = Math.random() * (canvas.offsetHeight - 400);

    // animar
    setTimeout(() => {
      note.style.left = `${finalX}px`;
      note.style.top = `${finalY}px`;
      note.style.transform = "none";
      note.style.opacity = "1";
    }, 100);

    // drag & drop
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

    // móvil
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
  } catch (err) {
    console.warn(err);
  }
});
