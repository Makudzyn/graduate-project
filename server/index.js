require('dotenv').config(); // Подключаем переменные окружения
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index')
const PORT = process.env.PORT || 5000; // Порт из файла переменных окружения, если не задан присваиваем 5000

const app = express();
app.use(cors()); // Отправка запросов с браузера
app.use(express.json()); // Работа с JSON-форматом
app.use('/api', router); // Обработка роутов

const start = async () => {
  try {
    await sequelize.authenticate(); // Установка подключения к БД
    await sequelize.sync(); // Сверка состояния БД со схемой данных
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start();