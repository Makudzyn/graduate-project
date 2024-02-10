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
      type: new DataTypes.STRING(25),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(70),
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

class HistoryRecord extends Model<InferAttributes<HistoryRecord>, InferCreationAttributes<HistoryRecord>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare pageName: string;
  declare parameters: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}


HistoryRecord.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    pageName: { type: new DataTypes.STRING(45), allowNull: false },
    parameters: { type: new DataTypes.STRING(220), allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "history_records",
    modelName: "history_record",
    sequelize,
  },
);


class Polynomial extends Model<InferAttributes<Polynomial>, InferCreationAttributes<Polynomial>> {
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
    polynomial: { type: new DataTypes.STRING(40), allowNull: false, unique: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "polynomials",
    modelName: "polynomial",
    sequelize,
  },
);

User.hasMany(HistoryRecord);
HistoryRecord.belongsTo(User);

export { User, HistoryRecord, Polynomial };
