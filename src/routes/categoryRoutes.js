const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET: listar com filtros e paginação
router.get('/v1/category/search', CategoryController.listCategories);

// GET: obter por ID
router.get('/v1/category/:id', CategoryController.getCategoryById);

// POST: criar (protegido)
router.post('/v1/category', authMiddleware, CategoryController.createCategory);

// PUT: atualizar (protegido)
router.put('/v1/category/:id', authMiddleware, CategoryController.updateCategory);

// DELETE: deletar (protegido)
router.delete('/v1/category/:id', authMiddleware, CategoryController.deleteCategory);

module.exports = router;
