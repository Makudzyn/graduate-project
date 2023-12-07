import {
  DataTypes,
  CreationOptional,
  Model,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import sequelize from "../db";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare role: string;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: new DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(240),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "users",
    modelName: "user",
    sequelize,
  },
);

class History extends Model<
  InferAttributes<History>,
  InferCreationAttributes<History>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

History.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "histories",
    modelName: "history",
    sequelize,
  },
);

class HistoryRecord extends Model<
  InferAttributes<HistoryRecord>,
  InferCreationAttributes<HistoryRecord>
> {
  declare id: CreationOptional<number>;
  declare formNumber: number;
  declare userValues: number[];
  declare historyId: ForeignKey<History['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

HistoryRecord.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    formNumber: { type: DataTypes.SMALLINT, allowNull: false },
    userValues: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "history_records",
    modelName: "history_record",
    sequelize,
  },
);

class Polynomial extends Model<
  InferAttributes<Polynomial>,
  InferCreationAttributes<Polynomial>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare degree: number;
  declare polynomial: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Polynomial.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: new DataTypes.STRING(25), unique: true, allowNull: false },
    degree: { type: DataTypes.SMALLINT, allowNull: false },
    polynomial: {
      type: new DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "polynomials",
    modelName: "polynomial",
    sequelize,
  },
);

class HistoryPolynomial extends Model<
  InferAttributes<HistoryPolynomial>,
  InferCreationAttributes<HistoryPolynomial>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

HistoryPolynomial.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "history_polynomials",
    modelName: "history_polynomial",
    sequelize,
  },
);

// Устанавливаем связи между таблицами
User.hasOne(History);
History.belongsTo(User);

History.hasMany(HistoryRecord);
HistoryRecord.belongsTo(History);

Polynomial.belongsToMany(HistoryRecord, { through: HistoryPolynomial });
HistoryRecord.belongsToMany(Polynomial, { through: HistoryPolynomial });

export { User, History, HistoryRecord, HistoryPolynomial, Polynomial };
