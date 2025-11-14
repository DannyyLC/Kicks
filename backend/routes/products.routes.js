const express = require('express');
const { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    productosAleatorios,
    addProductImages,
    deleteProductImage,
    getStockByCategory
} = require('../controllers/products.controllers');
const upload = require('../middleware/uploadImages');

const router = express.Router();

// Configuración de multer para subida de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp)'));
    }
});

router.get('/', getAllProducts);
router.post('/', upload.array('imagenes', 20), createProduct); // Permite hasta 20 imágenes
router.get('/randoms', productosAleatorios);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);
router.get('/stock/categoria/:categoria', getStockByCategory);

// Gestión de imágenes
router.post('/:id/imagenes', upload.array('imagenes', 5), addProductImages); // Agregar imágenes
router.delete('/:id/imagenes/:imageId', deleteProductImage); // Eliminar una imagen

module.exports = router;