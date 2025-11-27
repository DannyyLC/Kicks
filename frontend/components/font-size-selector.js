/**
 * Obtiene el tamaño de fuente inicial desde localStorage
 */
function getInitialFontSize() {
  const storedSize = localStorage.getItem("fontSize");
  return storedSize || "normal";
}

/**
 * Aplica el tamaño de fuente al elemento html
 */
function applyFontSize(size) {
  const html = document.documentElement;
  
  // Remover todas las clases de tamaño
  html.classList.remove('text-small', 'text-large', 'text-extra-large');
  
  // Aplicar la clase correspondiente
  switch(size) {
    case 'small':
      html.classList.add('text-small');
      break;
    case 'large':
      html.classList.add('text-large');
      break;
    case 'extra-large':
      html.classList.add('text-extra-large');
      break;
    case 'normal':
    default:
      // No agregar clase, usar el tamaño base por defecto (16px)
      break;
  }
  
  // Guardar en localStorage
  localStorage.setItem("fontSize", size);
}

/**
 * Inicializa el selector de tamaño de fuente
 * Aplica el tamaño guardado al cargar la página
 */
export function initFontSizeSelector() {
  const initialSize = getInitialFontSize();
  applyFontSize(initialSize);
}

/**
 * Configura los event listeners para los selectores de tamaño
 */
export function setupFontSizeSelectors(header) {
  const selectors = header.querySelectorAll('.font-size-selector');
  
  selectors.forEach(selector => {
    // Establecer el valor inicial
    const currentSize = getInitialFontSize();
    selector.value = currentSize;
    
    // Event listener para cambios
    selector.addEventListener('change', (e) => {
      const newSize = e.target.value;
      applyFontSize(newSize);
    });
  });
}