const { Model, DataTypes } = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        return super.init({
            enabled: DataTypes.BOOLEAN,
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            stock: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            price: DataTypes.FLOAT,
            price_with_discount: DataTypes.FLOAT
        }, {
            sequelize,
            modelName: 'Product',
            tableName: 'products',
            timestamps: true
        });
    }

    static associate(models) {
        this.belongsToMany(models.Category, {
            through: 'product_categories',
            foreignKey: 'product_id',
            otherKey: 'category_id'
        });

        this.hasMany(models.ProductImage, {
            foreignKey: 'product_id',
            as: 'ProductImages'
        });

        this.hasMany(models.ProductOption, {
            foreignKey: 'product_id',
            as: 'ProductOptions'
        });
    }
}

module.exports = Product;


