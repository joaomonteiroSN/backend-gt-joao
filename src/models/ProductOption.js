const { Model, DataTypes } = require('sequelize');

class ProductOption extends Model {
    static init(sequelize) {
        return super.init({
            title: DataTypes.STRING,
            shape: DataTypes.STRING,
            radius: DataTypes.STRING,
            type: DataTypes.STRING,
            values: DataTypes.TEXT
        }, {
            sequelize,
            modelName: 'ProductOption',
            tableName: 'product_options',
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

module.exports = ProductOption;
