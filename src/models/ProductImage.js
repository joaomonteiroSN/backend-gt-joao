const { Model, DataTypes } = require('sequelize');

class ProductImage extends Model {
    static init(sequelize) {
        return super.init({
            path: DataTypes.STRING,
            enabled: DataTypes.BOOLEAN
        }, {
            sequelize,
            modelName: 'ProductImage',
            tableName: 'product_images',
            timestamps: true
        });
    }

    static associate(models) {
        this.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product'
        });
    }
}

module.exports = ProductImage;
