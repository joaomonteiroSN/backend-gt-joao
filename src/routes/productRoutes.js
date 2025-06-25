const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/v1/product/search', ProductController.search);
router.get('/v1/product/:id', ProductController.getById);
router.post('/v1/product', authMiddleware, ProductController.create);
router.put('/v1/product/:id', authMiddleware, ProductController.update);
router.delete('/v1/product/:id', authMiddleware, ProductController.remove);

module.exports = router;
