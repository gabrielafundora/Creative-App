const prompts = [
  { text: "Escribe sobre una ciudad que solo existe en sueños.", category: "Fantasía" },
  { text: "Tu personaje descubre una carta escrita hace 100 años.", category: "Aventura" },
  { text: "Describe el sonido del silencio.", category: "Reflexión" },
  { text: "Un viaje en tren que cambia el destino de alguien.", category: "Aventura" },
  { text: "Inventar un mito sobre el origen de una flor.", category: "Fantasía" }
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

  