const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        return super.init({
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            firstname: { type: DataTypes.STRING, allowNull: false },
            surname: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
        });
    }

    // Aqui você pode adicionar associações no método estático associate, se precisar
    static associate(models) {
        // exemplo: this.hasMany(models.Order, { foreignKey: 'user_id' });
    }
}

module.exports = User;
