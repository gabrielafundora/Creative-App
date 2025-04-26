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
  
function newPrompt() {
  const selectedCategory = document.getElementById('categorySelect').value;
  
  let filteredPrompts = prompts;

  if (selectedCategory !== 'todas') {
    filteredPrompts = prompts.filter(prompt => prompt.category === selectedCategory);
  }

  const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
  const promptElement = document.getElementById('prompt');
  
  if (filteredPrompts.length > 0) {
    promptElement.innerText = filteredPrompts[randomIndex].text;
  } else {
    promptElement.innerText = "No hay prompts en esta categoría todavía.";
  }
}

  