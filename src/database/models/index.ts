import BookingHour from './BookingHour.js';
import Clipp from './Clipp.js';
import Court from './Court.js';

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
