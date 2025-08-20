import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../middlewares/auth';
import {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
  approveProjectService,
} from './projects.service';
import { CreateProjectInput, UpdateProjectInput } from './projects.validation';

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const projectData: CreateProjectInput = req.body;
    const student_id = customReq.user!.id;
    const project = await createProjectService(student_id, projectData);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { published } = req.query;
    const projects = await getAllProjectsService(published as string);
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const project = await getProjectByIdService(Number(id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { id } = req.params;
    const projectData: Partial<UpdateProjectInput> = req.body;
    const user_id = customReq.user!.id;
    const user_role = customReq.user!.role;

    const updatedProject = await updateProjectService(Number(id), user_id, user_role, projectData);
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { id } = req.params;
    const user_id = customReq.user!.id;
    const user_role = customReq.user!.role;

    await deleteProjectService(Number(id), user_id, user_role);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const approveProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { is_published } = req.body; // Expecting { is_published: true/false }
    const approvedProject = await approveProjectService(Number(id), is_published);
    res.status(200).json(approvedProject);
  } catch (error) {
    next(error);
  }
};
