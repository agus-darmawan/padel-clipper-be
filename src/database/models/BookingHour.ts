import {
  type CreationOptional,
  DataTypes,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/database.js';

interface BookingHourModel
  extends Model<
    InferAttributes<BookingHourModel>,
    InferCreationAttributes<BookingHourModel>
  > {
  id: CreationOptional<number>;
  courtId: number;
  dateStart: Date;
  dateEnd: Date;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

class BookingHour
  extends Model<
    InferAttributes<BookingHourModel>,
    InferCreationAttributes<BookingHourModel>
  >
  implements BookingHourModel
{
  declare id: CreationOptional<number>;
  declare courtId: number;
  declare dateStart: Date;
  declare dateEnd: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

BookingHour.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'court',
        key: 'id',
      },
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'BookingHour',
    tableName: 'booking_hour',
    timestamps: true,
  },
);

export default BookingHour;
