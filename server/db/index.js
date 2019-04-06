const db = require('./db');
const Product = require('./Product');
const User = require('./User');

Product.belongsTo(User);

const syncAndSeed = async () => {
  try {
    const productNames = ['bar', 'bazz', 'foo'];
    const userNames = ['moe', 'larry', 'curly'];
    await db.sync({force:true});
    await Promise.all(productNames.map(name => Product.create({name: name})));
    await Promise.all(userNames.map(name => User.create({name: name})));
    console.log('db seeded');
    await db.close();
  } catch (err) {
    console.log(err);
  }
};

syncAndSeed();

module.exports = {db, Product, User};
