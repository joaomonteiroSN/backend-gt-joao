const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // rota GET /v1/user/:id
    async getUserById(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'firstname', 'surname', 'email']
        });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        return res.status(200).json(user);
    },

    // rota POST /v1/user
    async createUser(req, res) {
        const { firstname, surname, email, password, confirmPassword } = req.body;

        if (!firstname || !surname || !email || !password || password !== confirmPassword) {
            return res.status(400).json({ error: 'Dados inválidos ou senhas não coincidem' });
        }

        const hash = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ firstname, surname, email, password: hash });
            return res.status(201).json({ message: 'Usuário criado com sucesso' });
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao criar usuário' });
        }
    },

    // rota PUT /v1/user/:id
    async updateUser(req, res) {
        const { id } = req.params;
        const { firstname, surname, email } = req.body;

        if (!firstname || !surname || !email) {
            return res.status(400).json({ error: 'Dados inválidos' });
        }

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        await user.update({ firstname, surname, email });
        return res.status(204).send();
    },

    // rota  DELETE /v1/user/:id
    async deleteUser(req, res) {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        await user.destroy();
        return res.status(204).send();
    }
};
