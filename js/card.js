export function crearCard(titulo, descripcion) {
 const card = document.createElement('article');
 const h3 = document.createElement('h3');
 const p = document.createElement('p');
 h3.textContent = titulo;
 p.textContent = descripcion;
 card.append(h3, p);
 card.classList.add('card');
 return card;
}
