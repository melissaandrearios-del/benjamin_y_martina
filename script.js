// Botones con flecha ↓: bajan suavemente a la siguiente sección.
// Sin JavaScript igual funcionan, porque cada botón es un enlace a #id.
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('[data-next]').forEach((boton) => {
  boton.addEventListener('click', (e) => {
    const siguiente = boton.closest('section')?.nextElementSibling;
    if (!siguiente) return;
    e.preventDefault();
    siguiente.scrollIntoView({
      behavior: reducirMovimiento.matches ? 'auto' : 'smooth',
      block: 'start',
    });
  });
});
