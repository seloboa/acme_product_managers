const express = require('express');
const app = express();
const path = require('path');
const {db, Product, User} = require('./db/index');

const port = process.env.PORT || 3000;

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
    const data = await Product.findAll({include: [{model: User}]});
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.get('/api/users', async (req, res, next) => {
  try {
    await db.sync();
    const data = await User.findAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));
