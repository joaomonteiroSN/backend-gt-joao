const { Model, DataTypes } = require('sequelize');

class ProductCategory extends Model {
    static init(sequelize) {
        return super.init({
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'ProductCategory',
            tableName: 'product_categories',
            timestamps: true
        });
    }

    static associate(models) {
        // Não é necessário associar diretamente aqui, pois o relacionamento é feito em Product e Category
    }
}

module.exports = ProductCategory;
