require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const appRouter = require('./routes/index');
const { PORT, DB_URL } = require('./utils/config');
const { cors } = require('./middlewares/сors');

const app = express();
app.use(cors);
app.use(express.json());
app.use(appRouter);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Соединение с Mongo установленно');
  })
  .catch((err) => {
    console.log(`Ошибка при установки соеденения с Mongo: ${err}`);
  });

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте: ${PORT}`);
});
