const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth.middleware');
const usuarioController = require('../controllers/auth.controllers');
const authMiddleware = require('../middleware/auth.middleware');

// Rutas públicas 
router.post('/register', auth.controllers.register);
router.post('/login', auth.controllers.login);

// Rutas protegidas 
router.get('/perfil', verifyToken, usuarioController.getProfile);
router.put('/perfil', verifyToken, usuarioController.updateProfile);
router.put('/cambiar-contraseña', verifyToken, usuarioController.changePassword);

module.exports = router;
