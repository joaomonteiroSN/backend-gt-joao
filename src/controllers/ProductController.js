const db = require('../models');
const { Product, Category, ProductImage, ProductOption } = require('../models');
const saveBase64Image = require('../utils/saveBase64Image');
const { Op } = require('sequelize');

module.exports = {
    async search(req, res) {
        try {
            let {
                limit = 12,
                page = 1,
                fields,
                match,
                category_ids,
                'price-range': priceRange,
                ...optionsQuery
            } = req.query;

            limit = parseInt(limit);
            page = parseInt(page);

            const where = {};

            // match por nome ou descrição
            if (match) {
                where[Op.or] = [
                    { name: { [Op.like]: `%${match}%` } },
                    { description: { [Op.like]: `%${match}%` } }
                ];
            }

            // faixa de preço
            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                where.price = { [Op.between]: [min, max] };
            }

            const include = [
                { model: Category, through: { attributes: [] } },
                { model: ProductImage, as: 'ProductImages', attributes: ['id', 'path'] },
                { model: ProductOption, as: 'ProductOptions' }
            ]

            // filtro por categoria
            if (category_ids) {
                const ids = category_ids.split(',').map(Number);
                include[0].where = { id: ids };
            }

            const attributes = fields ? fields.split(',') : undefined;

            const result = await Product.findAndCountAll({
                where,
                include,
                attributes,
                offset: limit === -1 ? undefined : (page - 1) * limit,
                limit: limit === -1 ? undefined : limit,
                distinct: true,
            });

            const data = result.rows.map(product => ({
                ...product.toJSON(),
                images: product.ProductImages?.map(img => ({
                    id: img.id,
                    content: `https://store.com${img.path}`
                })),
                category_ids: product.Categories?.map(cat => cat.id)
            }));

            return res.json({
                data,
                total: result.count,
                limit,
                page
            });

        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: 'Erro ao buscar produtos' });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;

            const product = await Product.findByPk(id, {
                include: [
                    { model: Category, through: { attributes: [] } },
                    { model: ProductImage, as: 'ProductImages', attributes: ['id', 'path'] },
                    { model: ProductOption, as: 'ProductOptions' }
                ]
            });

            if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

            return res.json({
                ...product.toJSON(),
                images: product.ProductImages.map(img => ({
                    id: img.id,
                    content: `https://store.com${img.path}`
                })),
                category_ids: product.Categories.map(cat => cat.id)
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: 'Erro ao buscar produto' });
        }
    },

    async create(req, res) {
        try {
            const {
                enabled,
                name,
                slug,
                stock,
                description,
                price,
                price_with_discount,
                category_ids,
                images,
                options
            } = req.body;

            if (!name || !slug || !price || !price_with_discount || !Array.isArray(category_ids)) {
                return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
            }

            const product = await Product.create({
                enabled: enabled ?? false,
                name,
                slug,
                stock: stock ?? 0,
                description,
                price,
                price_with_discount
            });

            await product.setCategories(category_ids);

            if (Array.isArray(images)) {
                for (const image of images) {
                    const path = saveBase64Image(image.content, image.type);
                    await ProductImage.create({ product_id: product.id, enabled: true, path });
                }
            }

            if (Array.isArray(options)) {
                for (const opt of options) {
                    await ProductOption.create({
                        product_id: product.id,
                        title: opt.title,
                        shape: opt.shape ?? 'square',
                        radius: opt.radius ?? 0,
                        type: opt.type ?? 'text',
                        values: opt.values.join(',')
                    });
                }
            }

            return res.status(201).json({ message: 'Produto criado com sucesso' });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: 'Erro ao criar produto' });
        }
    },

    async remove(req, res) {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

        await product.destroy();
        return res.status(204).send();
    }
}
