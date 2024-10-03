// Definimos una variable para la agenda de contactos.
let contactos = [];

if(localStorage.getItem('contactos')) {
    contactos = JSON.parse(localStorage.getItem('contactos'));
}

const formAgregar = document.getElementById('agregar-contacto');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputTelefono = document.getElementById('telefono');
const divListaContactos = document.getElementById('lista-contactos');

document.addEventListener('DOMContentLoaded', function() {
    // Si tenemos contactos ya cargados, renderizamos la vista.
    if(contactos.length > 0) {
        agendaRenderizarLista();
    }
});

formAgregar.addEventListener('submit', function(ev) {
    ev.preventDefault();
    
    // console.log('Enviando el formulario');

    // Agregamos el contacto.
    agendaAgregarContacto({
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        telefono: inputTelefono.value,
    });

    inputNombre.value = '';
    inputApellido.value = '';
    inputTelefono.value = '';

    // console.log('Se agregó el contacto');
});

function agendaAgregarContacto(contacto) {
    // console.log('Agregando el contacto...');
    // Agregamos el contacto a la lista de contactos.
    contactos.push(contacto);

    // Actualizamos localStorage.
    localStorage.setItem('contactos', JSON.stringify(contactos));

    // Actualizamos la lista.
    agendaRenderizarLista();
}

function agendaRenderizarLista() {
    // console.log('Empezando a renderizar la vista. Contactos: ', contactos);
    let contenido = ``;

    // Recorremos el array para generar cada uno de los ítems de la lista.
    contactos.forEach((contacto, i) => {
        contenido += `<li>
            <div><b>${contacto.apellido}, ${contacto.nombre}</b></div>
            <div>${contacto.telefono}</div>
            <div><button class="eliminar-contacto" data-i="${i}">Eliminar</button></div>
        </li>`;
    });
    
    // console.log('Agregando la lista. La lista de contenido es: ', contenido);
    // Agregamos la lista en el div de la interfaz.
    divListaContactos.innerHTML = `<ul>${contenido}</ul>`;

    agendaAsignarEventosEliminar();
}

function agendaAsignarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('.eliminar-contacto');

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function() {
            // Ese + solito adelante transforma el valor siguiente a número.
            const i = +this.getAttribute('data-i');
            contactos.splice(i, 1);

            // Actualizamos de nuevo localStorage.
            localStorage.setItem('contactos', JSON.stringify(contactos));

            // Luego de eliminado el ítem, re-renderizamos la lista.
            agendaRenderizarLista();
        });
    });
}