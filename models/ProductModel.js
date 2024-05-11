import DataTypes from 'sequelize';
import sequelize from '../helpers/database.js'

const Product = sequelize.define('Product', {
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Product
