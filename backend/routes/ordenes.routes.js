const express = require('express');
const { createOrder, getPaises, infoTransferencia, getOxxoDetails, getVentas, getVentasPorCategoria } = require('../controllers/ordenes.controllers');

const router = express.Router();

router.post('/', createOrder);
router.get('/paises', getPaises);
router.get('/info-transferencia', infoTransferencia);
router.get('/oxxo-details', getOxxoDetails);
router.get('/ventas', getVentas);
router.get('/ventas-por-categoria', getVentasPorCategoria);

module.exports = router;