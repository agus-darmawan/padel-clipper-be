import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface CourtModel
  extends Model<
    InferAttributes<CourtModel>,
    InferCreationAttributes<CourtModel>
  > {
  id: CreationOptional<number>;
  name: string;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class Court
  extends Model<
    InferAttributes<CourtModel>,
    InferCreationAttributes<CourtModel>
  >
  implements CourtModel
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare icon: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Court.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Court',
    tableName: 'court',
    timestamps: true,
  },
);

export default Court;
