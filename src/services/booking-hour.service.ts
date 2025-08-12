import { BookingHour, Court } from '@/database/models/index.js';
import { NotFoundError } from '@/utils/base.error.js';

class BookingHourService {
  async createBookingHour(
    courtId: number,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<BookingHour> {
    const court = await Court.findByPk(courtId);
    if (!court) {
      throw new NotFoundError('Court not found');
    }

    const bookingHour = await BookingHour.create({
      courtId,
      dateStart,
      dateEnd,
    });
    return bookingHour;
  }

  async getAllBookingHours(): Promise<BookingHour[]> {
    const bookingHours = await BookingHour.findAll({
      include: [{ model: Court, as: 'court' }],
      order: [['dateStart', 'ASC']],
    });
    return bookingHours;
  }

  async getBookingHoursByCourtId(courtId: number): Promise<BookingHour[]> {
    const court = await Court.findByPk(courtId);
    if (!court) {
      throw new NotFoundError('Court not found');
    }

    const bookingHours = await BookingHour.findAll({
      where: { courtId },
      include: [{ model: Court, as: 'court' }],
      order: [['dateStart', 'ASC']],
    });

    return bookingHours;
  }

  async getBookingHourById(id: number): Promise<BookingHour> {
    const bookingHour = await BookingHour.findByPk(id, {
      include: [{ model: Court, as: 'court' }],
    });
    if (!bookingHour) {
      throw new NotFoundError('Booking hour not found');
    }
    return bookingHour;
  }

  async updateBookingHour(
    id: number,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<BookingHour> {
    const bookingHour = await BookingHour.findByPk(id);
    if (!bookingHour) {
      throw new NotFoundError('Booking hour not found');
    }

    await bookingHour.update({ dateStart, dateEnd });
    return bookingHour;
  }

  async deleteBookingHour(id: number): Promise<void> {
    const bookingHour = await BookingHour.findByPk(id);
    if (!bookingHour) {
      throw new NotFoundError('Booking hour not found');
    }

    await bookingHour.destroy();
  }
}

export default BookingHourService;
