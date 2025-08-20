import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../middlewares/auth';
import {
  createTestimonialService,
  getAllTestimonialsService,
  getTestimonialByIdService,
  updateTestimonialService,
  deleteTestimonialService,
  approveTestimonialService,
} from './testimonials.service';
import { CreateTestimonialInput, UpdateTestimonialInput } from './testimonials.validation';

export const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const testimonialData: CreateTestimonialInput = req.body;
    // If student_id is not provided in body, use authenticated user's ID
    if (!testimonialData.student_id && customReq.user) {
      testimonialData.student_id = customReq.user.id;
    }
    const testimonial = await createTestimonialService(testimonialData);
    res.status(201).json(testimonial);
  } catch (error) {
    next(error);
  }
};

export const getAllTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { approved } = req.query;
    const testimonials = await getAllTestimonialsService(approved as string);
    res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

export const getTestimonialById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const testimonial = await getTestimonialByIdService(Number(id));
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const testimonialData: Partial<UpdateTestimonialInput> = req.body;
    const updatedTestimonial = await updateTestimonialService(Number(id), testimonialData);
    res.status(200).json(updatedTestimonial);
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteTestimonialService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const approveTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { is_approved } = req.body; // Expecting { is_approved: true/false }
    const approvedTestimonial = await approveTestimonialService(Number(id), is_approved);
    res.status(200).json(approvedTestimonial);
  } catch (error) {
    next(error);
  }
};
