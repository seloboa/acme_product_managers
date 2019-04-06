const db = require('./db');

const User = db.define('user', {
  name: db.Sequelize.STRING,
  allowNull: false,
});

module.exports = User;
