import { Court } from '@/database/models/index.js';
import { NotFoundError } from '@/utils/base.error.js';

class CourtService {
  async createCourt(name: string): Promise<Court> {
    const court = await Court.create({ name });
    return court;
  }

  async getAllCourts(): Promise<Court[]> {
    const courts = await Court.findAll({
      order: [['createdAt', 'DESC']],
    });
    return courts;
  }

  async getCourtById(id: number): Promise<Court> {
    const court = await Court.findByPk(id);
    if (!court) {
      throw new NotFoundError('Court not found');
    }
    return court;
  }

  async updateCourt(id: number, name: string): Promise<Court> {
    const court = await Court.findByPk(id);
    if (!court) {
      throw new NotFoundError('Court not found');
    }

    await court.update({ name });
    return court;
  }

  async deleteCourt(id: number): Promise<void> {
    const court = await Court.findByPk(id);
    if (!court) {
      throw new NotFoundError('Court not found');
    }

    await court.destroy();
  }
}

export default CourtService;
