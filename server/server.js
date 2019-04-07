const express = require('express');
const app = express();
const path = require('path');
const {db, Product, User, syncAndSeed} = require('./db/index');

const port = process.env.PORT || 3000;

syncAndSeed();
//json parser middleware
app.use(express.json());

//main routes
app.get('/app.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'));
});

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

//api routes
app.get('/api/products', async (req, res, next) => {
  try {
    await db.sync();
    const data = await Product.findAll({
      include: [{model: User}],
      order: [['id', 'ASC']],
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.get('/api/users', async (req, res, next) => {
  try {
    await db.sync();
    const data = await User.findAll({
      order: [['id', 'ASC']],
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.put('/api/products/:id', async (req, res, next) => {
  try {
    await db.sync();
    const product = await Product.findByPk(req.params.id);
    const updatedProduct = await product.update(req.body);
    res.send(updatedProduct);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));
