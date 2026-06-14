export function renderGaleria(lista) {
 const contenedor = document.getElementById('galeria');
 contenedor.textContent = '';
 lista.forEach(url => {
 const img = document.createElement('img');
 img.src = url;
 img.alt = 'Imagen dinámica';
 img.loading = 'lazy';
 contenedor.appendChild(img);
 });
}