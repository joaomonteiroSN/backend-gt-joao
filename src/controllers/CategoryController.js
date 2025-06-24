const { Category } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    // GET /v1/category/search
    async listCategories(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 12;
            const page = parseInt(req.query.page) || 1;
            const fields = req.query.fields ? req.query.fields.split(',') : null;
            const useInMenu = req.query.use_in_menu;

            const where = {};
            if (useInMenu !== undefined) {
                where.use_in_menu = useInMenu === 'true';
            }

            const options = {
                where,
                attributes: fields || undefined,
                offset: limit === -1 ? undefined : (page - 1) * limit,
                limit: limit === -1 ? undefined : limit,
            };

            const { count: total, rows: data } = await Category.findAndCountAll(options);

            return res.status(200).json({
                data,
                total,
                limit,
                page,
            });
        } catch (err) {
            return res.status(400).json({ error: 'Parâmetros inválidos' });
        }
    },

    // GET /v1/category/:id
    async getCategoryById(req, res) {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });
        return res.status(200).json(category);
    },

    // POST /v1/category
    async createCategory(req, res) {
        const { name, slug, use_in_menu } = req.body;
        if (!name || !slug) {
            return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
        }

        try {
            await Category.create({ name, slug, use_in_menu });
            return res.status(201).json({ message: 'Categoria criada com sucesso' });
        } catch (err) {
            return res.status(400).json({ error: 'Erro ao criar categoria' });
        }
    },

    // PUT /v1/category/:id
    async updateCategory(req, res) {
        const { id } = req.params;
        const { name, slug, use_in_menu } = req.body;

        if (!name || !slug) {
            return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
        }

        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });

        await category.update({ name, slug, use_in_menu });
        return res.status(204).send();
    },

    // DELETE /v1/category/:id
    async deleteCategory(req, res) {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });

        await category.destroy();
        return res.status(204).send();
    }
};
