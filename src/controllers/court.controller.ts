import type { Request, Response } from 'express';
import CourtService from '@/services/court.service.js';
import { handleError } from '@/utils/error.handler.js';

const service = new CourtService();

export const createCourtController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const result = await service.createCourt(name);
    res.status(201).json({
      message: 'Court created successfully',
      data: result,
      success: true,
    });
  } catch (error: unknown) {
    handleError(error, res);
  }
};

export const getAllCourtsController = async (_req: Request, res: Response) => {
  try {
    const result = await service.getAllCourts();
    res.status(200).json({
      message: 'All courts retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getCourtByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    const result = await service.getCourtById(id);
    res.status(200).json({
      message: 'Court retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateCourtController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    const { name } = req.body;
    const result = await service.updateCourt(id, name);
    res.status(200).json({
      message: `Court with id ${id} updated successfully`,
      data: result,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteCourtController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    await service.deleteCourt(id);
    res.status(200).json({
      message: `Court with id ${id} deleted successfully`,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
