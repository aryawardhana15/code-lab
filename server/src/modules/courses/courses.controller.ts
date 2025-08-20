import { Request, Response, NextFunction } from 'express';
import {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService,
  getCourseMaterialsService,
  createMaterialService,
  updateMaterialService,
  deleteMaterialService,
  reorderMaterialsService,
} from './courses.service';
import { CourseInput, MaterialInput, ReorderMaterialsInput } from './courses.validation';

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseData: CourseInput = req.body;
    const course = await createCourseService(courseData);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { level, published } = req.query;
    const courses = await getAllCoursesService(level as string, published as string);
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const course = await getCourseByIdService(Number(id));
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const courseData: Partial<CourseInput> = req.body;
    const updatedCourse = await updateCourseService(Number(id), courseData);
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteCourseService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getCourseMaterials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const materials = await getCourseMaterialsService(Number(id));
    res.status(200).json(materials);
  } catch (error) {
    next(error);
  }
};

export const createMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // courseId
    const materialData: MaterialInput = req.body;
    const material = await createMaterialService(Number(id), materialData);
    res.status(201).json(material);
  } catch (error) {
    next(error);
  }
};

export const updateMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId, materialId } = req.params;
    const materialData: Partial<MaterialInput> = req.body;
    const updatedMaterial = await updateMaterialService(Number(courseId), Number(materialId), materialData);
    res.status(200).json(updatedMaterial);
  } catch (error) {
    next(error);
  }
};

export const deleteMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courseId, materialId } = req.params;
    await deleteMaterialService(Number(courseId), Number(materialId));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const reorderMaterials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; // courseId
    const reorderData: ReorderMaterialsInput = req.body;
    await reorderMaterialsService(Number(id), reorderData);
    res.status(200).json({ message: 'Materials reordered successfully' });
  } catch (error) {
    next(error);
  }
};
