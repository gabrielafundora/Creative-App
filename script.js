const retos = [
  { text: "Describe un bosque que cambia de forma según quién lo observa.", category: "Fantasía" },
  { text: "Imagina un animal que nunca ha existido y cuéntanos sobre su mundo.", category: "Fantasía" },
  { text: "Una puerta aparece en tu habitación. ¿Qué hay del otro lado?", category: "Fantasía" },
  { text: "Escribe sobre una ciudad flotante en el cielo.", category: "Fantasía" },
  { text: "Un mago ha olvidado sus hechizos más importantes. ¿Qué sucede?", category: "Fantasía" },
  { text: "Describe un recuerdo que no sabes si realmente viviste o soñaste.", category: "Reflexión" },
  { text: "¿Qué significa para ti la palabra 'hogar'?", category: "Reflexión" },
  { text: "Un objeto cotidiano que guarda una historia profunda.", category: "Reflexión" },
  { text: "Escribe sobre el paso del tiempo como si fuera un personaje.", category: "Reflexión" },
  { text: "Una conversación silenciosa entre dos personas.", category: "Reflexión" },
  { text: "Tu personaje debe cruzar un país en guerra para entregar un mensaje.", category: "Aventura" },
  { text: "Explora un barco abandonado en el medio del océano.", category: "Aventura" },
  { text: "Una expedición a una montaña que nunca ha sido escalada.", category: "Aventura" },
  { text: "Un mapa antiguo cae en tus manos. ¿Qué haces?", category: "Aventura" },
  { text: "Durante una tormenta, descubres un pasaje secreto en tu ciudad.", category: "Aventura" }
];

let currentRetoText = "";

function newReto() {
  const selectedCategory = document.getElementById('categorySelect').value;
  
  let filteredRetos = retos;

  if (selectedCategory !== 'todas') {
    filteredRetos = retos.filter(reto => reto.category === selectedCategory);
  }

  const randomIndex = Math.floor(Math.random() * filteredRetos.length);
  const retoElement = document.getElementById('reto');
  const markDoneButton = document.getElementById('markDoneButton');
  
  if (filteredRetos.length > 0) {
    const selectedReto = filteredRetos[randomIndex];
    currentRetoText = selectedReto.text;
    retoElement.innerText = selectedReto.text;

    const doneRetos = JSON.parse(localStorage.getItem('doneRetos')) || [];
    if (doneRetos.includes(currentRetoText)) {
      retoElement.style.color = "#28a745";
      markDoneButton.style.display = "none";
    } else {
      retoElement.style.color = "#333333";
      markDoneButton.style.display = "inline-block";
    }
  } else {
    retoElement.innerText = "No hay retos en esta categoría todavía.";
    markDoneButton.style.display = "none";
  }
}

function markCurrentAsDone() {
  if (!currentRetoText) return;

  const doneRetos = JSON.parse(localStorage.getItem('doneRetos')) || [];

  if (!doneRetos.includes(currentRetoText)) {
    doneRetos.push(currentRetoText);
    localStorage.setItem('doneRetos', JSON.stringify(doneRetos));
  }

  const retoElement = document.getElementById('reto');
  const markDoneButton = document.getElementById('markDoneButton');

  retoElement.style.color = "#28a745";
  markDoneButton.style.display = "none";
}
