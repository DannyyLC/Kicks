// ============================================
// CARGAR PRODUCTOS DESTACADOS DESDE EL BACKEND
// ============================================
async function loadFeaturedProducts() {
    const productsGrid = document.getElementById('featured-products-grid');
    
    try {
        // Importar la función de API dinámicamente
        const { obtenerProductosDestacados } = await import('./api/productos.js');
        
        // Obtener productos destacados del backend
        const productos = await obtenerProductosDestacados(4);
        
        // Limpiar el loading
        productsGrid.innerHTML = '';
        
        // Renderizar productos
        productos.forEach(producto => {
            const productCard = createProductCard(producto);
            productsGrid.appendChild(productCard);
        });
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
        productsGrid.innerHTML = `
            <div class="products-error">
                <p>No se pudieron cargar los productos en este momento.</p>
                <button onclick="loadFeaturedProducts()" class="btn btn-primary">Reintentar</button>
            </div>
        `;
    }
}

// Función para crear una tarjeta de producto
function createProductCard(producto) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Determinar si hay descuento
    const hasDiscount = producto.precioOriginal && producto.precioOriginal > producto.precio;
    const discountPercent = hasDiscount 
        ? Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)
        : 0;
    
    card.innerHTML = `
        <div class="product-image">
            <div class="product-placeholder" style="background-image: url('${producto.imagen || ''}');">
                ${!producto.imagen ? '<div style="background: linear-gradient(135deg, var(--color-input-bg) 0%, var(--color-input-border) 100%); width: 100%; height: 100%;"></div>' : ''}
            </div>
            ${producto.esNuevo ? '<div class="product-badge">Nuevo</div>' : ''}
            ${hasDiscount ? `<div class="product-badge product-badge-sale">-${discountPercent}%</div>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-name">${producto.nombre}</h3>
            <p class="product-category">${producto.categoria || 'General'}</p>
            <div class="product-footer">
                ${hasDiscount ? `
                    <div class="product-price-group">
                        <span class="product-price-old">$${producto.precioOriginal.toFixed(2)}</span>
                        <span class="product-price">$${producto.precio.toFixed(2)}</span>
                    </div>
                ` : `
                    <span class="product-price">$${producto.precio.toFixed(2)}</span>
                `}
                <button class="product-cart-btn" onclick="addToCart('${producto.id}')" aria-label="Agregar al carrito">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    // Hacer clic en la tarjeta para ir al detalle del producto
    card.addEventListener('click', (e) => {
        // No redirigir si se hizo clic en el botón de carrito
        if (!e.target.closest('.product-cart-btn')) {
            window.location.href = `tienda/producto.html?id=${producto.id}`;
        }
    });
    
    return card;
}

// Función para agregar al carrito
function addToCart(productId) {
    // TODO: Implementar la lógica para agregar al carrito
    console.log('Agregar producto al carrito:', productId);
    // Aquí puedes llamar a tu API o manejar el carrito localmente
}

// ============================================
// FUNCIONALIDAD DEL CAROUSEL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos destacados
    loadFeaturedProducts();
    
    // Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.querySelector('.carousel-control-prev');
    const nextBtn = document.querySelector('.carousel-control-next');
    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(n) {
      // Remover clase active de todos los slides e indicadores
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));

        // Ajustar el índice si está fuera de rango
        if (n >= slides.length) {
          currentSlide = 0;
        } else if (n < 0) {
          currentSlide = slides.length - 1;
        } else {
          currentSlide = n;
        }

        // Mostrar el slide actual
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

      // Event listeners para los controles
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay(); // Reiniciar autoplay
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay(); // Reiniciar autoplay
    });

      // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          showSlide(index);
          stopAutoplay();
          startAutoplay(); // Reiniciar autoplay
        });
    });

    // Pausar autoplay cuando el mouse está sobre el carousel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);

    // Soporte para gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
          // Swipe left
          nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
          // Swipe right
          prevSlide();
        }
    }

    // Iniciar autoplay
    startAutoplay();
});