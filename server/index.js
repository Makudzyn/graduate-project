require('dotenv').config(); // Подключаем переменные окружения
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const PORT = process.env.PORT || 5000; // Порт из файла переменных окружения, если не задан присваиваем 5000

const app = express();

app.use(cors()); // Отправка запросов с браузера
app.use(express.json()); // Работа с JSON-форматом
app.use('/api', router); // Обработка роутов

app.use(errorHandler); // Обработка ошибок. Этот мидлвейр должен идти последним, на нем работа должна прекратиться

const start = async () => {
  try {
    await sequelize.authenticate(); // Установка подключения к БД
    await sequelize.sync({alter: true}); // Сверка состояния БД со схемой данных
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start();