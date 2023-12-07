import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string, // Название БД
  process.env.DB_USER as string, // Пользователь
  process.env.DB_PASSWORD as string, // Пароль входа в БД
  {
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string), // Парсим строку в число
  }
);


export default sequelize;