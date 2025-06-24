const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(sequelize) {
        return super.init({
            name: DataTypes.STRING,
            slug: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'Category',
            tableName: 'categories',
            timestamps: true
        });
    }

    static associate(models) {
        this.belongsToMany(models.Product, {
            through: 'product_categories',
            foreignKey: 'category_id',
            otherKey: 'product_id'
        });
    }
}

module.exports = Category;
