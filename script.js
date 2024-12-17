// Lista de frames para cada sobre
const envelopeFrames = {
  1: ["images/sobre.webp", "images/sobre2.webp", "images/sobre3.webp", "images/sobre4.webp", "images/sobre5.webp",
    "images/sobre6.webp", "images/sobre7.webp", "images/sobre8.webp", "images/sobre9.webp", "images/carta.webp"],
  2: ["images/sobre.webp", "images/sobre2.webp", "images/sobre3.webp", "images/sobre4.webp", "images/sobre5.webp",
    "images/sobre6.webp", "images/sobre7.webp", "images/sobre8.webp", "images/sobre9.webp", "images/cartaBrillo.webp"],
  3: ["images/sobre.webp", "images/sobre2.webp", "images/sobre3.webp", "images/sobre4.webp", "images/sobre5.webp",
    "images/sobre6.webp", "images/sobre7.webp", "images/sobre8.webp", "images/sobre9.webp", "images/carta.webp"]
};

let currentFrame = {}; // Rastrea el frame actual para cada sobre
let animationInterval = {}; // Intervalos para cada sobre
let envelopeChosen = false; // Verifica si ya se eligió un sobre

// Función para precargar imágenes
function preloadImages(imageArray) {
  imageArray.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Precarga todas las imágenes al cargar el documento
Object.values(envelopeFrames).forEach(preloadImages);

function playAnimation(envelopeId) {
  console.log("Iniciando animación para sobre ID:", envelopeId);

  // Si ya se eligió un sobre, no permitir interacción
  if (envelopeChosen) return;

  const imageElement = document.getElementById(`animationImage${envelopeId}`);

  // Si ya se está animando este sobre, no hacer nada
  if (animationInterval[envelopeId]) return;

  // Marcar que se ha elegido un sobre
  envelopeChosen = true;

  // Deshabilitar la interacción en los demás sobres
  disableOtherEnvelopes(envelopeId);

  currentFrame[envelopeId] = 0; // Reinicia el frame actual

  // Ejecuta la animación frame por frame
  animationInterval[envelopeId] = setInterval(() => {
    currentFrame[envelopeId]++;
    console.log("Frame actual:", currentFrame[envelopeId], "Imagen:", envelopeFrames[envelopeId][currentFrame[envelopeId]]);

    if (currentFrame[envelopeId] >= envelopeFrames[envelopeId].length) {
      clearInterval(animationInterval[envelopeId]); // Detén la animación
      animationInterval[envelopeId] = null; // Libera el intervalo

      // Aplica el efecto de brillo después de la animación
      imageElement.classList.add("flash");

      // Elimina el efecto de brillo después de 3 segundos
      setTimeout(() => {
        imageElement.classList.remove("flash");
      }, 2000);

      return;
    }

    // Cambia la imagen del sobre correspondiente
    imageElement.src = envelopeFrames[envelopeId][currentFrame[envelopeId]];
  }, 100); // Ajusta el tiempo a 100ms para probar un efecto más estable
}

function disableOtherEnvelopes(selectedId) {
  // Obtén todos los sobres
  const envelopes = document.querySelectorAll(".image-container");

  // Recorre y deshabilita la interacción en sobres no seleccionados
  envelopes.forEach((envelope, index) => {
    const envelopeId = index + 1; // IDs basados en índice (1, 2, 3)
    if (envelopeId !== selectedId) {
      envelope.style.pointerEvents = "none"; // Deshabilitar clics
      envelope.style.opacity = "0.5"; // Reducir opacidad para indicar deshabilitado
    }
  });
}

// Función para mostrar confeti
function mostrarConfeti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 } // Punto de inicio
  });

  // Mostrar mensaje de "¡Feliz cumpleaños!"
  const mensaje = document.createElement("div");
  mensaje.textContent = "¡Feliz cumpleaños!";
  mensaje.style.position = "fixed";
  mensaje.style.top = "50%";
  mensaje.style.left = "50%";
  mensaje.style.transform = "translate(-50%, -50%)";
  mensaje.style.color = "#fff";
  mensaje.style.borderRadius = "10px";
  mensaje.style.fontSize = "95px";
  mensaje.style.fontFamily = "Chewy";
  mensaje.style.zIndex = "9999";

  document.body.appendChild(mensaje);

  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    mensaje.remove();
  }, 3000);
}

// Botón de confeti
document.getElementById("btnConfetti").addEventListener("click", mostrarConfeti);

// Función para desbloquear los sobres (botón "Abrir Regalo")
document.getElementById("reveal-button").addEventListener("click", function () {
  const userCode = prompt("Por favor, ingresa el código en minúsculas:");
  const correctCode = "rubik"; // Código correcto

  if (userCode === correctCode) {
    document.getElementById("hidden-content").style.display = "block";
    document.getElementById("message").textContent = "";
    console.log("Código correcto. Sobres desbloqueados.");
  } else {
    document.getElementById("message").textContent = "Código incorrecto. Intenta de nuevo.";
    document.getElementById("hidden-content").style.display = "none";
    console.warn("Código incorrecto. Acceso denegado.");
  }
});

//gatito
function cambiarGatito() {
  // Obtiene la imagen principal
  const imagenGatito = document.getElementById("gatito");
  const imagenExtra = document.getElementById("gatitoExtra");

  // Cambia la imagen al hacer clic
  if (imagenGatito.src.includes("sanjinormal.png")) {
    imagenGatito.src = "img/bento/sanjiowau.png"; // Cambia a la segunda imagen
  } else {
    imagenGatito.src = "img/bento/sanjinormal.png"; // Vuelve a la primera imagen
    imagenExtra.hidden = true; // Oculta la imagen extra (opcional)
  }
}