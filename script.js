
let retos = []; 

function cargarRetos() {
  fetch('retos_completos.json')
    .then(response => response.json())
    .then(data => {
      retos = data;
      console.log(`Se cargaron ${retos.length} retos.`);
      if (localStorage.getItem('loggedUser')) {
        showRetoSection();
      }
    })
    .catch(error => {
      console.error('Error cargando retos:', error);
      toastr.error('No se pudieron cargar los retos.', 'Error');
    });
}

// Resto del código igual al anterior resumido por espacio
