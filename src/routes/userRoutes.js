const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auteMiddleware = require('../middlewares/auteMiddleware');

// GET usuário por ID
router.get('/v1/user/:id', UserController.getUserById);

// POST criar usuário
router.post('/v1/user', UserController.createUser);

// PUT atualizar usuário (protegido)
router.put('/v1/user/:id', auteMiddleware, UserController.updateUser);

// DELETE usuário (protegido)
router.delete('/v1/user/:id', auteMiddleware, UserController.deleteUser);

module.exports = router;
