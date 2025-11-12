import { API_URL } from './config.js';

/**
 * Obtener productos destacados
 * @param {number} limit - Número de productos a obtener
 * @returns {Promise<Array>} - Array de productos
 */
export async function obtenerProductosDestacados(limit = 4) {
    try {
        const response = await fetch(`${API_URL}/productos/destacados?limit=${limit}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener productos destacados:', error);
        throw error;
    }
}

/**
 * Obtener todos los productos con filtros opcionales
 * @param {Object} filtros - Objeto con filtros (categoria, precioMin, precioMax, etc.)
 * @returns {Promise<Array>} - Array de productos
 */
export async function obtenerProductos(filtros = {}) {
    try {
        const params = new URLSearchParams();
        
        if (filtros.categoria) params.append('categoria', filtros.categoria);
        if (filtros.precioMin) params.append('precioMin', filtros.precioMin);
        if (filtros.precioMax) params.append('precioMax', filtros.precioMax);
        if (filtros.busqueda) params.append('q', filtros.busqueda);
        if (filtros.limite) params.append('limit', filtros.limite);
        if (filtros.pagina) params.append('page', filtros.pagina);
        
        const url = `${API_URL}/productos${params.toString() ? '?' + params.toString() : ''}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

/**
 * Obtener un producto por su ID
 * @param {string} id - ID del producto
 * @returns {Promise<Object>} - Objeto del producto
 */
export async function obtenerProductoPorId(id) {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener producto:', error);
        throw error;
    }
}

/**
 * Obtener categorías disponibles
 * @returns {Promise<Array>} - Array de categorías
 */
export async function obtenerCategorias() {
    try {
        const response = await fetch(`${API_URL}/productos/categorias`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
}
