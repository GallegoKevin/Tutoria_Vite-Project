import axios from 'axios';
import './style.css'


const tbody = document.querySelector('#table-user tbody');
const form = document.getElementById('form-users');

// Función para leer y mostrar los usuarios
async function readUsers() {
    try {
        const response = await axios.get('http://localhost:3000/users');
        const data = response.data;

        // Limpiar tbody solo si hay datos nuevos para evitar duplicados innecesarios
        if (data.length > 0) {
            tbody.innerHTML = '';
        }

        // Iterar sobre cada usuario y crear las filas
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const fila = await createRow(element, i + 1);
            tbody.appendChild(fila);
        }
    } catch (error) {
        console.error('Error al leer usuarios:', error);
    }
}

// Función para crear una fila de usuario
async function createRow(user, index) {
    const fila = document.createElement('tr');

    // Celda número
    const celdaNro = document.createElement('th');
    celdaNro.scope = 'row';
    celdaNro.textContent = index;
    celdaNro.classList.add('number');
    fila.appendChild(celdaNro);

    // Celda nombre
    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = user.name;
    fila.appendChild(celdaNombre);

    // Celda apellido
    const celdaApellido = document.createElement('td');
    celdaApellido.textContent = user.lastname;
    fila.appendChild(celdaApellido);

    // Celda país
    const celdaPais = document.createElement('td');
    celdaPais.textContent = user.country;
    fila.appendChild(celdaPais);

    // Celda bandera
    const celdaBandera = document.createElement('td');
    try {
        const codigoPais = await obtenerCodigoPais(user.country);
        const urlBandera = `https://flagcdn.com/w320/${codigoPais}.png`;
        const imgBandera = document.createElement('img');
        imgBandera.src = urlBandera;
        imgBandera.alt = `${user.country} flag`;
        imgBandera.style.width = '50px';
        celdaBandera.appendChild(imgBandera);
    } catch (error) {
        console.error('Error al obtener bandera:', error);
        celdaBandera.textContent = 'Not available';
    }
    fila.appendChild(celdaBandera);

    // Celda ID
    const celdaId = document.createElement('td');
    celdaId.textContent = user.id;
    fila.appendChild(celdaId);

    // Celda botón
    const celdaBtn = document.createElement('td');
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "Eliminar";
    btnEliminar.dataset.id = user.id; // Usar dataset para almacenar el id
    btnEliminar.addEventListener('click', deleteButtonClickHandler);
    celdaBtn.appendChild(btnEliminar);
    fila.appendChild(celdaBtn);

    return fila;
}

// Función para manejar el click en el botón Eliminar
async function deleteButtonClickHandler(event) {
    const idToDelete = event.target.dataset.id;
    try {
        await axios.delete(`http://localhost:3000/users/${idToDelete}`);
        const rowToDelete = event.target.closest('tr');
        if (rowToDelete) {
            rowToDelete.remove();
            renumberRows(); // Llamar a la función para renumerar las filas después de eliminar
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
}

// Función para renumerar las filas
function renumberRows() {
    const filas = tbody.querySelectorAll('tr');
    filas.forEach((fila, index) => {
        const celdaNro = fila.querySelector('th.number');
        if (celdaNro) {
            celdaNro.textContent = index + 1;
        }
    });
}

// Función para añadir usuario
async function addUsers(user) {
    try {
        const response = await axios.post('http://localhost:3000/users', user);
        const newUser = response.data;

        // Agregar la nueva fila al final de la tabla
        const newRow = await createRow(newUser, tbody.children.length + 1);
        tbody.appendChild(newRow);

        form.reset(); // Limpiar formulario después de agregar
    } catch (error) {
        console.error('Error al añadir usuario:', error);
    }
}

// Función para obtener el código ISO-3166-1 alpha-2 del país usando REST Countries API
async function obtenerCodigoPais(nombrePais) {
    try {
        const nombreIngles = await traducirANombreIngles(nombrePais.toUpperCase()); // Convertir a mayúsculas
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(nombreIngles)}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            return data[0].cca2.toLowerCase();
        } else {
            throw new Error(`No se encontró información para "${nombrePais}".`);
        }
    } catch (error) {
        console.error('Error al obtener código ISO del país desde REST Countries:', error);
        throw new Error('Ocurrió un error al obtener el código ISO del país.');
    }
}

// Función para traducir nombre de país a inglés
async function traducirANombreIngles(nombrePais) {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(nombrePais)}&langpair=es|en`);
        const data = await response.json();

        if (data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText.toLowerCase();
        } else {
            throw new Error(`No se pudo traducir "${nombrePais}" a inglés.`);
        }
    } catch (error) {
        console.error('Error al traducir nombre del país a inglés:', error);
        throw new Error('Ocurrió un error al traducir el nombre del país a inglés.');
    }
}

// Evento submit del formulario para añadir usuario
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastname').value.trim();
    const country = document.getElementById('country').value.trim();

    if (!firstName || !lastName || !country) {
        alert('Por favor completa todos los campos.');
        return;
    }

    const user = {
        name: firstName,
        lastname: lastName,
        country: country
    };

    addUsers(user);
});

// Cargar usuarios al iniciar la página
readUsers();

