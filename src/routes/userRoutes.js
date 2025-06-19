const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET usuário por ID
router.get('/v1/user/:id', UserController.getUserById);

// POST criar usuário
router.post('/v1/user', UserController.createUser);

// PUT atualizar usuário (protegido)
router.put('/v1/user/:id', authMiddleware, UserController.updateUser);

// DELETE usuário (protegido)
router.delete('/v1/user/:id', authMiddleware, UserController.deleteUser);

module.exports = router;
