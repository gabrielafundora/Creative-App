toastr.options = {
  "closeButton": true,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "timeOut": "3000"
};

let currentRetoText = "";

let retos = []; // Ahora retos empieza vacío

function cargarRetos() {
  fetch('retos_completos.json')
    .then(response => response.json())
    .then(data => {
      retos = data;
      console.log(`Se cargaron ${retos.length} retos.`);
      // Actualizamos el contador si ya hay sesión iniciada
      if (localStorage.getItem('loggedUser')) {
        actualizarContadorRetos();
      }
    })
    .catch(error => {
      console.error('Error cargando retos:', error);
      toastr.error('No se pudieron cargar los retos.', 'Error');
    });
}


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


function retoDelDia() {
  if (retos.length === 0) {
    // Si los retos todavía no han cargado
    document.getElementById('textoRetoDelDia').innerText = "Cargando retos...";
    return;
  }

  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = hoy.getMonth() + 1; // Mes empieza en 0
  const día = hoy.getDate();

  // Crear una "semilla" basada en la fecha
  const semilla = año * 10000 + mes * 100 + día;

  // Seleccionar un reto basándonos en la semilla
  const index = semilla % retos.length;
  const retoHoy = retos[index];

  // Mostrar el reto del día
  const texto = `${retoHoy.text} [${retoHoy.category}]`;
  document.getElementById('textoRetoDelDia').innerText = texto;
}

function retoDelDia() {
  if (retos.length === 0) {
    document.getElementById('textoRetoDelDia').innerText = "Cargando retos...";
    return;
  }

  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = hoy.getMonth() + 1;
  const día = hoy.getDate();
  const fechaHoy = `${año}-${mes}-${día}`;

  const semilla = año * 10000 + mes * 100 + día;
  const index = semilla % retos.length;
  const retoHoy = retos[index];

  document.getElementById('textoRetoDelDia').innerText = `${retoHoy.text} [${retoHoy.category}]`;

  // Verificar si ya fue marcado como hecho
  const retosDia = JSON.parse(localStorage.getItem('retosDia')) || {};
  if (retosDia[fechaHoy]) {
    document.getElementById('botonRetoDia').style.display = 'none';
    const completado = document.createElement('div');
    completado.style.color = "#28a745";
    completado.style.marginTop = "10px";
    completado.innerText = "✅ Reto del Día completado";
    document.getElementById('retoDelDia').appendChild(completado);
  }
}

function marcarRetoDelDia() {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = hoy.getMonth() + 1;
  const día = hoy.getDate();
  const fechaHoy = `${año}-${mes}-${día}`;

  const retosDia = JSON.parse(localStorage.getItem('retosDia')) || {};
  retosDia[fechaHoy] = true;
  localStorage.setItem('retosDia', JSON.stringify(retosDia));

  toastr.success('¡Felicidades! Completaste el reto del día.', 'Reto del Día');

  // Ocultar botón y mostrar mensaje de completado
  document.getElementById('botonRetoDia').style.display = 'none';
  const completado = document.createElement('div');
  completado.style.color = "#28a745";
  completado.style.marginTop = "10px";
  completado.innerText = "✅ Reto del Día completado";
  document.getElementById('retoDelDia').appendChild(completado);
}
