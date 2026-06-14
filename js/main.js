// Estructura básica de JavaScript para capturar acciones de la página
import { formatearNombre } from './utils.js';
console.log(formatearNombre(' atalaya studio ')); // "ATALAYA STUDIO"
// Lectura de datos
import { renderizarTestimonios, validarFormulario } from './ui.js';
import { obtenerUsuarios } from './api.js';
import { renderGaleria } from './gallery.js';
import { crearCard } from './card.js';

const seccion = document.getElementById('servicios');
const card = crearCard('Diseño Web', 'Desarrollo de interfaces modernas.');
seccion.appendChild(card);

const formulario = document.getElementById('contact-form');
const contenedorTestimonios = document.getElementById('contenedor-testimonios');
const estadoFormulario = document.getElementById('form-status');
const themeToggle = document.getElementById('theme-toggle');

function aplicarTema(theme) {
    const esOscuro = theme === 'dark';
    document.body.classList.toggle('dark', esOscuro);
    if (themeToggle) {
        themeToggle.textContent = esOscuro ? '☀️ Modo claro' : '🌙 Modo oscuro';
        themeToggle.setAttribute('aria-label', esOscuro ? 'Activar modo claro' : 'Activar modo oscuro');
    }
}

const temaGuardado = localStorage.getItem('theme');
aplicarTema(temaGuardado || 'light');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const temaActual = document.body.classList.contains('dark') ? 'dark' : 'light';
        const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', nuevoTema);
        aplicarTema(nuevoTema);
    });
}

const usuarios = await obtenerUsuarios();
if (usuarios) {
    renderizarTestimonios(usuarios, contenedorTestimonios);
}

if (formulario) {
    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!validarFormulario(formulario)) {
            return;
        }

        const datos = {
            nombre: formulario.nombre.value.trim(),
            email: formulario.email.value.trim(),
            mensaje: formulario.mensaje.value.trim()
        };

        try {
            const respuesta = await fetch(`${window.location.origin}/api/contacto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            const texto = await respuesta.text();
            let resultado = {};

            try {
                resultado = texto ? JSON.parse(texto) : {};
            } catch {
                throw new Error(texto || 'Respuesta inesperada del servidor.');
            }

            if (!respuesta.ok) {
                throw new Error(resultado.mensaje || 'No se pudo enviar el mensaje.');
            }

            if (estadoFormulario) {
                estadoFormulario.textContent = resultado.mensaje;
                estadoFormulario.className = 'form-status is-success';
            }
            formulario.reset();
        } catch (error) {
            if (estadoFormulario) {
                estadoFormulario.textContent = error.message;
                estadoFormulario.className = 'form-status is-error';
            }
        }
    });
}