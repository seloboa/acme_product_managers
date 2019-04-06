const Sequelize = require('sequelize');
const dbURL =
  process.env.DATABASE_URL || 'postgres://localhost/acmeproductmanagers';

const db = new Sequelize(dbURL, {logging: false});

module.exports = db
