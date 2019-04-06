const db = require('./db');

const User = db.define('user', {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
