import BookingHour from './BookingHour';
import Clipp from './Clipp';
import Court from './Court';

// Relasi antara BookingHour dan Court
BookingHour.belongsTo(Court, { foreignKey: 'courtId', as: 'court' });
Court.hasMany(BookingHour, { foreignKey: 'courtId', as: 'bookingHours' });

// Relasi antara Clipp dan BookingHour
Clipp.belongsTo(BookingHour, {
  foreignKey: 'bookingHourId',
  as: 'bookingHour',
});
BookingHour.hasMany(Clipp, { foreignKey: 'bookingHourId', as: 'clips' });

export { Court, BookingHour, Clipp };
