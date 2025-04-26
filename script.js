toastr.options = {
  "closeButton": true,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "timeOut": "3000"
};

let currentRetoText = "";

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

// LOGIN Y REGISTRO

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function register() {
  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  if (!username || !password) {
    toastr.alert('Por favor, completa todos los campos.');
    return;
  }

  const users = getUsers();

  if (users.find(u => u.username === username)) {
    toastr.alert('Este usuario ya existe.');
    return;
  }

  users.push({ username, password, retosCompletados: [] });
  saveUsers(users);
  alert('¡Registro exitoso! Ahora inicia sesión.');
  showLogin();
}

function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert('Usuario o contraseña incorrectos.');
    return;
  }

  localStorage.setItem('loggedUser', username);
  showRetoSection();
}

function logout() {
  localStorage.removeItem('loggedUser');
  location.reload();
}

function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function showRetoSection() {
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('retoSection').style.display = 'block';
  loadLastReto();
}

function checkSession() {
  const user = localStorage.getItem('loggedUser');
  if (user) {
    showRetoSection();
  }
}

// FUNCIONES DE RETOS

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

    localStorage.setItem('currentReto', currentRetoText);

    const doneRetos = getDoneRetos();
    if (doneRetos.includes(currentRetoText)) {
      retoElement.style.color = "#28a745";
      markDoneButton.style.display = "none";
    } else {
      retoElement.style.color = "#333333";
      markDoneButton.style.display = "inline-block";
    }
  }
}

function markCurrentAsDone() {
  if (!currentRetoText) return;

  const username = localStorage.getItem('loggedUser');
  const users = getUsers();
  const user = users.find(u => u.username === username);

  if (!user.retosCompletados.includes(currentRetoText)) {
    user.retosCompletados.push(currentRetoText);
    saveUsers(users);
  }

  actualizarContadorRetos();

  document.getElementById('reto').style.color = "#28a745";
  document.getElementById('markDoneButton').style.display = "none";
}

function loadLastReto() {
  const lastReto = localStorage.getItem('currentReto');
  const retoElement = document.getElementById('reto');
  const markDoneButton = document.getElementById('markDoneButton');
  
  if (lastReto) {
    currentRetoText = lastReto;
    retoElement.innerText = lastReto;

    const doneRetos = getDoneRetos();
    if (doneRetos.includes(currentRetoText)) {
      retoElement.style.color = "#28a745";
      markDoneButton.style.display = "none";
    } else {
      retoElement.style.color = "#333333";
      markDoneButton.style.display = "inline-block";
    }
  }
  actualizarContadorRetos();
}

function getDoneRetos() {
  const username = localStorage.getItem('loggedUser');
  const users = getUsers();
  const user = users.find(u => u.username === username);
  return user ? user.retosCompletados : [];
}

function actualizarContadorRetos() {
  const retosCompletados = getDoneRetos().length;

  const contadorDiv = document.getElementById('contadorRetos');
  contadorDiv.innerText = `Retos completados: ${retosCompletados}`;
}


