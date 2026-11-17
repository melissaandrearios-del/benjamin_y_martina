// ===== Alto de cada pantalla =====
// Ajusta el alto al área visible del teléfono (con la barra del navegador puesta),
// para que el botón de abajo siempre se vea. Cambia estos dos números si quieres:
const ALTO_MIN = 170;    // pantalla más corta permitida (en "u")
const ALTO_MAX = 222.3;  // proporción completa 960x2134

function ajustarAlto() {
  // 100svh = alto visible mínimo (con la barra del navegador mostrada)
  const medidor = document.createElement('div');
  medidor.style.cssText = 'position:fixed;top:0;width:0;height:100svh;visibility:hidden';
  document.body.appendChild(medidor);
  const alto = medidor.offsetHeight;
  medidor.remove();

  const ancho = Math.min(window.innerWidth, 480);
  const H = Math.min(ALTO_MAX, Math.max(ALTO_MIN, (100 * alto) / ancho));
  document.documentElement.style.setProperty('--H', H.toFixed(1));
}

ajustarAlto();
let anchoPrevio = window.innerWidth;
window.addEventListener('resize', () => {
  // solo si cambia el ancho (giro de pantalla); así no salta al esconderse la barra
  if (window.innerWidth !== anchoPrevio) {
    anchoPrevio = window.innerWidth;
    ajustarAlto();
  }
});

// ===== Botones con flecha ↓ =====
// Bajan suavemente a la siguiente sección. Sin JavaScript igual funcionan (son enlaces a #id).
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
