import { Request, Response, NextFunction } from 'express';
import {
  createScheduleService,
  getAllSchedulesService,
  getScheduleByIdService,
  updateScheduleService,
  deleteScheduleService,
} from './schedules.service';
import { CreateScheduleInput, UpdateScheduleInput } from './schedules.validation';

export const createSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scheduleData: CreateScheduleInput = req.body;
    const schedule = await createScheduleService(scheduleData);
    res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
};

export const getAllSchedules = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.query;
    const schedules = await getAllSchedulesService(courseId as string);
    res.status(200).json(schedules);
  } catch (error) {
    next(error);
  }
};

export const getScheduleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const schedule = await getScheduleByIdService(Number(id));
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(schedule);
  } catch (error) {
    next(error);
  }
};

export const updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const scheduleData: Partial<UpdateScheduleInput> = req.body;
    const updatedSchedule = await updateScheduleService(Number(id), scheduleData);
    res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteScheduleService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
