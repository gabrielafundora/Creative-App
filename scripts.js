const prompts = [
    "Escribe sobre una ciudad que solo existe en sueños.",
    "Tu personaje descubre una carta escrita hace 100 años.",
    "Describe el sonido del silencio.",
    "Un viaje en tren que cambia el destino de alguien.",
    "Inventar un mito sobre el origen de una flor."
  ];
  
  function newPrompt() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    document.getElementById('prompt').innerText = prompts[randomIndex];
  }
  