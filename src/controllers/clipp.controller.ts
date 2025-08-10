import type { Request, Response } from 'express';
import ClippService from '@/services/clipp.service.js';
import { handleError } from '@/utils/error.handler.js';
import createUpload from '@/utils/file.upload.js';

const service = new ClippService();
const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

const upload = createUpload('./uploads/videos', allowedVideoTypes).single(
  'video',
);

export const uploadClippController = (req: Request, res: Response): void => {
  upload(req, res, async (err) => {
    if (err instanceof Error) {
      res.status(400).json({
        message: err.message,
        success: false,
      });
      return;
    }

    const { bookingHourId } = req.body;
    const file = req.file;

    if (!file) {
      res.status(400).json({
        message: 'No video file uploaded',
        success: false,
      });
      return;
    }

    try {
      const clipp = await service.uploadClippFile(bookingHourId, file);
      res.status(201).json({
        message: 'Video uploaded successfully',
        data: clipp,
        success: true,
      });
    } catch (error) {
      handleError(error, res);
    }
  });
};

export const getClippsByBookingHourController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bookingHourId = parseInt(req.params.bookingHourId || '0', 10);
    if (Number.isNaN(bookingHourId)) {
      res.status(400).json({
        message: 'Invalid booking hour ID',
        success: false,
      });
      return;
    }

    const clips = await service.getClippsByBookingHour(bookingHourId);
    res.status(200).json({
      message: 'Clipps retrieved successfully',
      data: clips,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getClippByCourtAndIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const courtId = parseInt(req.params.courtId || '0', 10);
    const clippId = parseInt(req.params.id || '0', 10);

    if (Number.isNaN(courtId) || Number.isNaN(clippId)) {
      res.status(400).json({
        message: 'Invalid court ID or clipp ID',
        success: false,
      });
      return;
    }

    const clipp = await service.getClippByCourtAndId(courtId, clippId);
    res.status(200).json({
      message: 'Clipp retrieved successfully',
      data: clipp,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getClippByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const clippId = parseInt(req.params.id || '0', 10);

    if (Number.isNaN(clippId)) {
      res.status(400).json({
        message: 'Invalid clipp ID',
        success: false,
      });
      return;
    }

    const clipp = await service.getClippById(clippId);
    res.status(200).json({
      message: 'Clipp retrieved successfully',
      data: clipp,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
