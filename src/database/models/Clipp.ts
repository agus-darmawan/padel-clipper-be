import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface ClippModel
  extends Model<
    InferAttributes<ClippModel>,
    InferCreationAttributes<ClippModel>
  > {
  id: CreationOptional<number>;
  bookingHourId: number;
  name: string;
  filePath: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class Clipp
  extends Model<
    InferAttributes<ClippModel>,
    InferCreationAttributes<ClippModel>
  >
  implements ClippModel
{
  declare id: CreationOptional<number>;
  declare bookingHourId: number;
  declare name: string;
  declare filePath: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Clipp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookingHourId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'booking_hour',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Clipp',
    tableName: 'clipp',
    timestamps: true,
  },
);

export default Clipp;
