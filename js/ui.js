export function renderizarTestimonios(usuarios, contenedor) {
    const muestra = usuarios.slice(0, 3); // Mostrar solo los primeros 3 testimonios
    muestra.forEach(usuario => {
        const card = document.createElement('article');
        card.innerHTML = `
            <h3>${usuario.name}</h3>
            <p> Trabaja en :<strong>${usuario.company.name}</strong></p>
            <small>${usuario.email}</small>
            <hr>
        `;
        contenedor.appendChild(card);
    });
}
export function validarFormulario(formulario) {
    const nombre = formulario.nombre.value.trim();
    const email = formulario.email.value.trim();
    const mensaje = formulario.mensaje.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return false;
    }
    return nombre && email && mensaje;
}