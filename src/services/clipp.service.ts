import { BookingHour, Clipp } from '@/database/models/index.js';
import { NotFoundError } from '@/utils/base.error';

class ClippService {
  async uploadClippFile(
    bookingHourId: number,
    file: Express.Multer.File,
  ): Promise<Clipp> {
    const bookingHour = await BookingHour.findByPk(bookingHourId);
    if (!bookingHour) {
      throw new NotFoundError('Booking hour not found');
    }

    const filePath = file.path;
    const clipp = await Clipp.create({
      bookingHourId,
      name: file.originalname,
      filePath,
    });

    return clipp;
  }

  async getClippsByBookingHour(bookingHourId: number): Promise<Clipp[]> {
    const clips = await Clipp.findAll({
      where: { bookingHourId },
      order: [['createdAt', 'DESC']],
    });
    return clips;
  }

  async getClippById(id: number): Promise<Clipp> {
    const clipp = await Clipp.findByPk(id);
    if (!clipp) {
      throw new NotFoundError('Clipp not found');
    }
    return clipp;
  }

  async getClippByCourtAndId(courtId: number, id: number): Promise<Clipp> {
    const clipp = await Clipp.findOne({
      where: {
        id,
        '$bookingHour.courtId$': courtId,
      },
      include: [
        {
          model: BookingHour,
          as: 'bookingHour',
          required: true,
        },
      ],
    });
    if (!clipp) {
      throw new NotFoundError(
        'Clipp not found for the specified Court ID and Clipp ID',
      );
    }
    return clipp;
  }
}

export default ClippService;
