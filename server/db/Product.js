const db = require('./db');

const Product = db.define('product',{
  name:{
    type: db.Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Product
