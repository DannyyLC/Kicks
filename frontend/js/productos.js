// ============================================
// IMPORTS
// ============================================
import { renderProductCards } from '../components/product-card.js';
import { getProducts } from './utils/auth.js';
import { aiChatIcon, trashIcon } from './utils/icons.js';
import { obtenerUrlImagen } from './utils/utilities.js';
import '../js/utils/chat.js'

// ============================================
// VARIABLES GLOBALES
// ============================================
let todosLosProductos = [];
let productosFiltrados = [];

// Referencias a elementos del DOM
document.getElementById('chatFabIcon').innerHTML = aiChatIcon;
document.getElementById('chatHeaderIcon').innerHTML = aiChatIcon;
document.getElementById('clearChat').innerHTML = trashIcon;
const productosGrid = document.getElementById('productos-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const discountFilter = document.getElementById('discount-filter');
const priceMinInput = document.getElementById('price-min'); 
const priceMaxInput = document.getElementById('price-max'); 
const clearFiltersBtn = document.getElementById('clear-filters');
const resultsCount = document.getElementById('results-count');

// ============================================
// FUNCIONES AUXILIARES
// ============================================
// Procesar productos para agregar URL completa de imagen
function procesarProductos(productos) {
    return productos.map(producto => ({
        ...producto,
        imagenCompleta: obtenerUrlImagen(producto.imagen)
    }));
}

// ============================================
// CARGAR PRODUCTOS INICIALES
// ============================================
async function cargarProductos() {
    try {
        // Mostrar loading
        productosGrid.innerHTML = `
            <div class="products-loading">
                <div class="loading-spinner"></div>
                <p>Cargando productos...</p>
            </div>
        `;

        // Obtener parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoriaParam = urlParams.get('categoria');
        const descuentoParam = urlParams.get('descuento');

        // Validar y preparar filtros
        const categoriasValidas = ['running', 'senderismo', 'basketball'];
        let categoria = null;
        let hasDescuento = null;

        // Validar categoría
        if (categoriaParam) {
            const categoriaLower = categoriaParam.toLowerCase();
            if (categoriasValidas.includes(categoriaLower)) {
                categoria = categoriaLower;
                categoryFilter.value = categoriaLower;
            }
        }

        // Validar descuento
        if (descuentoParam === 'true') {
            hasDescuento = true;
            discountFilter.value = 'true';
        }

        const result = await getProducts(categoria, hasDescuento);

        if (!result.success) {
            throw new Error(result.error);
        }

        // Procesar productos con URLs completas
        todosLosProductos = procesarProductos(result.products);
        productosFiltrados = [...todosLosProductos];

        window.history.replaceState({}, '', window.location.pathname);

        // Renderizar
        renderizarProductos();

    } catch (error) {
        console.error('Error al cargar productos:', error);
        productosGrid.innerHTML = `
            <div class="products-error">
                <p>No se pudieron cargar los productos en este momento.</p>
                <button onclick="window.location.reload()" class="btn btn-primary">Reintentar</button>
            </div>
        `;
    }
}

// ============================================
// APLICAR FILTROS
// ============================================
async function aplicarFiltros() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value.toLowerCase();
    const selectedDiscount = discountFilter.value;
    const precioMin = priceMinInput.value ? parseFloat(priceMinInput.value) : null;
    const precioMax = priceMaxInput.value ? parseFloat(priceMaxInput.value) : null;

    // Mostrar loading mientras se obtienen productos del backend
    productosGrid.innerHTML = `
        <div class="products-loading">
            <div class="loading-spinner"></div>
            <p>Cargando productos...</p>
        </div>
    `;

    try {
        const categoria = selectedCategory || null;
        const hasDescuento = selectedDiscount === 'true' ? 1 : null;
        
        const result = await getProducts(categoria, hasDescuento, precioMin, precioMax);

        if (!result.success) {
            throw new Error(result.error);
        }

        // Procesar productos con URLs completas
        todosLosProductos = procesarProductos(result.products);

        productosFiltrados = todosLosProductos.filter(producto => {
            // Si no hay búsqueda, mostrar todos
            if (!searchTerm) return true;

            // Filtro de búsqueda por texto
            return producto.nombre.toLowerCase().includes(searchTerm) ||
                   (producto.categoria && producto.categoria.toLowerCase().includes(searchTerm)) ||
                   (producto.marca && producto.marca.toLowerCase().includes(searchTerm));
        });

        // Renderizar productos filtrados
        renderizarProductos();

    } catch (error) {
        console.error('Error al aplicar filtros:', error);
        productosGrid.innerHTML = `
            <div class="products-error">
                <p>No se pudieron cargar los productos.</p>
                <button onclick="aplicarFiltros()" class="btn btn-primary">Reintentar</button>
            </div>
        `;
    }
}

// ============================================
// RENDERIZAR PRODUCTOS
// ============================================
function renderizarProductos() {
    // Actualizar contador de resultados
    actualizarContador();

    // Si no hay productos, mostrar mensaje
    if (productosFiltrados.length === 0) {
        productosGrid.innerHTML = `
            <div class="products-empty">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <p>No se encontraron productos con los filtros seleccionados</p>
                <button onclick="document.getElementById('clear-filters').click()" class="btn btn-primary">
                    Limpiar filtros
                </button>
            </div>
        `;
        return;
    }

    // Renderizar productos usando el componente
    renderProductCards(productosFiltrados, productosGrid);
}

// ============================================
// ACTUALIZAR CONTADOR DE RESULTADOS
// ============================================
function actualizarContador() {
    const total = todosLosProductos.length;
    const mostrados = productosFiltrados.length;

    if (mostrados === total) {
        resultsCount.textContent = `Mostrando ${total} producto${total !== 1 ? 's' : ''}`;
    } else {
        resultsCount.textContent = `Mostrando ${mostrados} de ${total} producto${total !== 1 ? 's' : ''}`;
    }
}

// ============================================
// LIMPIAR FILTROS
// ============================================
function limpiarFiltros() {
    searchInput.value = '';
    categoryFilter.value = '';
    discountFilter.value = '';
    priceMinInput.value = ''; 
    priceMaxInput.value = ''; 
    
    // Limpiar parámetros de URL
    const url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, '', url);

    aplicarFiltros();
}

// ============================================
// EVENT LISTENERS
// ============================================
function inicializarEventListeners() {
    // Búsqueda con debounce (solo filtra en frontend)
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            // Solo filtrar en frontend si ya tenemos productos
            productosFiltrados = todosLosProductos.filter(producto => {
                const searchTerm = searchInput.value.toLowerCase().trim();
                if (!searchTerm) return true;

                return producto.nombre.toLowerCase().includes(searchTerm) ||
                       (producto.categoria && producto.categoria.toLowerCase().includes(searchTerm)) ||
                       (producto.marca && producto.marca.toLowerCase().includes(searchTerm));
            });
            renderizarProductos();
        }, 300);
    });

    categoryFilter.addEventListener('change', aplicarFiltros);
    discountFilter.addEventListener('change', aplicarFiltros);

    // Event listeners para precio con debounce
    let priceTimeout;
    priceMinInput.addEventListener('input', () => {
        clearTimeout(priceTimeout);
        priceTimeout = setTimeout(() => {
            aplicarFiltros();
        }, 500);
    });

    priceMaxInput.addEventListener('input', () => {
        clearTimeout(priceTimeout);
        priceTimeout = setTimeout(() => {
            aplicarFiltros();
        }, 500);
    });

    // Botón limpiar filtros
    clearFiltersBtn.addEventListener('click', limpiarFiltros);
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    inicializarEventListeners();
    cargarProductos();
});

// Exponer función para el botón de reintentar
window.recargarProductos = cargarProductos;