const prompts = [
  // Fantasía
  { text: "Describe un bosque que cambia de forma según quién lo observa.", category: "Fantasía" },
  { text: "Imagina un animal que nunca ha existido y cuéntanos sobre su mundo.", category: "Fantasía" },
  { text: "Una puerta aparece en tu habitación. ¿Qué hay del otro lado?", category: "Fantasía" },
  { text: "Escribe sobre una ciudad flotante en el cielo.", category: "Fantasía" },
  { text: "Un mago ha olvidado sus hechizos más importantes. ¿Qué sucede?", category: "Fantasía" },

  // Reflexión
  { text: "Describe un recuerdo que no sabes si realmente viviste o soñaste.", category: "Reflexión" },
  { text: "¿Qué significa para ti la palabra 'hogar'?", category: "Reflexión" },
  { text: "Un objeto cotidiano que guarda una historia profunda.", category: "Reflexión" },
  { text: "Escribe sobre el paso del tiempo como si fuera un personaje.", category: "Reflexión" },
  { text: "Una conversación silenciosa entre dos personas.", category: "Reflexión" },

  // Aventura
  { text: "Tu personaje debe cruzar un país en guerra para entregar un mensaje.", category: "Aventura" },
  { text: "Explora un barco abandonado en el medio del océano.", category: "Aventura" },
  { text: "Una expedición a una montaña que nunca ha sido escalada.", category: "Aventura" },
  { text: "Un mapa antiguo cae en tus manos. ¿Qué haces?", category: "Aventura" },
  { text: "Durante una tormenta, descubres un pasaje secreto en tu ciudad.", category: "Aventura" }
];
  
let currentPromptText = "";

function newPrompt() {
  const selectedCategory = document.getElementById('categorySelect').value;
  
  let filteredPrompts = prompts;

  if (selectedCategory !== 'todas') {
    filteredPrompts = prompts.filter(prompt => prompt.category === selectedCategory);
  }

  const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
  const promptElement = document.getElementById('prompt');
  const markDoneButton = document.getElementById('markDoneButton');
  
  if (filteredPrompts.length > 0) {
    const selectedPrompt = filteredPrompts[randomIndex];
    currentPromptText = selectedPrompt.text; // Guardamos el texto actual
    promptElement.innerText = selectedPrompt.text;

    // Verificar si ya está marcado como hecho
    const donePrompts = JSON.parse(localStorage.getItem('donePrompts')) || [];
    if (donePrompts.includes(currentPromptText)) {
      promptElement.style.color = "#28a745"; // Verde si ya estaba hecho
      markDoneButton.style.display = "none"; // Ya no mostrar botón
    } else {
      promptElement.style.color = "#333333"; // Normal si no estaba hecho
      markDoneButton.style.display = "inline-block"; // Mostrar botón
    }
  } else {
    promptElement.innerText = "No hay prompts en esta categoría todavía.";
    markDoneButton.style.display = "none"; // No mostrar botón si no hay prompts
  }
}


function showAllPrompts() {
  const allPromptsContainer = document.getElementById('allPrompts');
  
  // Si ya está visible, ocultarlo
  if (allPromptsContainer.style.display === "block") {
    allPromptsContainer.style.display = "none";
    allPromptsContainer.classList.remove('fade-in');
    return;
  }

  // Limpiar contenido anterior
  allPromptsContainer.innerHTML = "";

  // Generar lista
  prompts.forEach(prompt => {
    const promptItem = document.createElement('div');
    promptItem.className = 'prompt-item';
    promptItem.innerHTML = `<strong>${prompt.category}</strong>: ${prompt.text}`;
    allPromptsContainer.appendChild(promptItem);
  });

  // Mostrar la lista con efecto
  allPromptsContainer.style.display = "block";
  allPromptsContainer.classList.add('fade-in');
}

function markCurrentAsDone() {
  if (!currentPromptText) return;

  const donePrompts = JSON.parse(localStorage.getItem('donePrompts')) || [];

  // Si no estaba marcado, lo guardamos
  if (!donePrompts.includes(currentPromptText)) {
    donePrompts.push(currentPromptText);
    localStorage.setItem('donePrompts', JSON.stringify(donePrompts));
  }

  // Actualizar visualmente
  const promptElement = document.getElementById('prompt');
  const markDoneButton = document.getElementById('markDoneButton');

  promptElement.style.color = "#28a745"; // Cambiar color a verde
  markDoneButton.style.display = "none"; // Ocultar botón "Marcar como hecho"
}

