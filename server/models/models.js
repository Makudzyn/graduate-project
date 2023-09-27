const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
})

const History = sequelize.define('history', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const HistoryRecord = sequelize.define('history_record', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  form_number: {type: DataTypes.INTEGER, allowNull: false},
  user_values: {type: DataTypes.ARRAY(DataTypes.INTEGER)},
})

const Polynomial = sequelize.define('polynomial', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  degree: {type: DataTypes.INTEGER, allowNull: false},
  polynomial: {type: DataTypes.INTEGER, allowNull: false},
})

const HistoryPolynomial = sequelize.define('history_polynomial', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// Устагавливаем связи между таблицами
User.hasOne(History);
History.belongsTo(User);

History.hasMany(HistoryRecord);
HistoryRecord.belongsTo(History);

Polynomial.belongsToMany(HistoryRecord, {through: HistoryPolynomial});
HistoryRecord.belongsToMany(Polynomial, {through: HistoryPolynomial});

module.exports = {
  User, History, HistoryRecord,
  HistoryPolynomial, Polynomial
}