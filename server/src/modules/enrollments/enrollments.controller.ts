import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../middlewares/auth';
import {
  enrollInCourseService,
  getMyEnrollmentsService,
  updateProgressService,
} from './enrollments.service';
import { EnrollmentInput, ProgressUpdateInput } from './enrollments.validation';

export const enrollInCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { course_id }: EnrollmentInput = req.body;
    const student_id = customReq.user!.id;
    const enrollment = await enrollInCourseService(student_id, course_id);
    res.status(201).json(enrollment);
  } catch (error) {
    next(error);
  }
};

export const getMyEnrollments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const student_id = customReq.user!.id;
    const enrollments = await getMyEnrollmentsService(student_id);
    res.status(200).json(enrollments);
  } catch (error) {
    next(error);
  }
};

export const updateProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { enrollment_id, material_id, status }: ProgressUpdateInput = req.body;
    const student_id = customReq.user!.id; // Ensure the user updating progress is the enrolled student
    const updatedProgress = await updateProgressService(student_id, enrollment_id, material_id, status);
    res.status(200).json(updatedProgress);
  } catch (error) {
    next(error);
  }
};
