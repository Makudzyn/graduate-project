import dotenv from 'dotenv'; // Подключаем переменные окружения
import express, { Express } from 'express';
import cors from 'cors';
import sequelize from './db';
import models from './models/models';
import router from './routes/index';
import errorHandler from './middleware/errorHandlingMiddleware';

dotenv.config();

const app: Express = express();
const PORT: number | string = process.env.PORT || 5000; // Порт из файла переменных окружения, если не задан, присваиваем 5000

app.use(cors()); // Отправка запросов с браузера
app.use(express.json()); // Работа с JSON-форматом
app.use('/api', router); // Обработка роутов

app.use(errorHandler); // Обработка ошибок. Этот мидлвейр должен идти последним, на нем работа должна прекратиться

const start = async () => {
  try {
    await sequelize.authenticate(); // Установка подключения к БД
    await sequelize.sync({alter: true}); // Сверка состояния БД со схемой данных
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e: any) {
    console.log(e)
  }
}

start();