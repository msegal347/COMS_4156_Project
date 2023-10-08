import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, FoodLink API!');
});

app.listen(port, () => {
  console.log(`FoodLink API listening at http://localhost:${port}`);
});
