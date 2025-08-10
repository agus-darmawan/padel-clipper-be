import type { Request, Response } from 'express';
import BookingHourService from '@/services/booking-hour.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new BookingHourService();

export const createBookingHourController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { courtId, dateStart, dateEnd } = req.body;
    const result = await service.createBookingHour(
      courtId,
      new Date(dateStart),
      new Date(dateEnd),
    );
    res.status(201).json({
      message: 'Booking hour created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllBookingHoursController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await service.getAllBookingHours();
    res.status(200).json({
      message: 'All booking hours retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getBookingHourByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getBookingHourById(id);
    res.status(200).json({
      message: 'Booking hour retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateBookingHourController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    const { dateStart, dateEnd } = req.body;
    const result = await service.updateBookingHour(
      id,
      new Date(dateStart),
      new Date(dateEnd),
    );
    res.status(200).json({
      message: `Booking hour with id ${id} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteBookingHourController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deleteBookingHour(id);
    res.status(200).json({
      message: `Booking hour with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
