import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../middlewares/auth';
import {
  createChallengeService,
  getAllChallengesService,
  getChallengeByIdService,
  updateChallengeService,
  deleteChallengeService,
  submitChallengeService,
  getChallengeSubmissionsService,
  gradeSubmissionService,
} from './challenges.service';
import {
  CreateChallengeInput,
  UpdateChallengeInput,
  SubmitChallengeInput,
  GradeSubmissionInput,
} from './challenges.validation';

export const createChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const challengeData: CreateChallengeInput = req.body;
    const challenge = await createChallengeService(challengeData);
    res.status(201).json(challenge);
  } catch (error) {
    next(error);
  }
};

export const getAllChallenges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const challenges = await getAllChallengesService();
    res.status(200).json(challenges);
  } catch (error) {
    next(error);
  }
};

export const getChallengeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const challenge = await getChallengeByIdService(Number(id));
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.status(200).json(challenge);
  } catch (error) {
    next(error);
  }
};

export const updateChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const challengeData: Partial<UpdateChallengeInput> = req.body;
    const updatedChallenge = await updateChallengeService(Number(id), challengeData);
    res.status(200).json(updatedChallenge);
  } catch (error) {
    next(error);
  }
};

export const deleteChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteChallengeService(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const submitChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { challengeId } = req.params;
    const submissionData: SubmitChallengeInput = req.body;
    const student_id = customReq.user!.id;
    const submission = await submitChallengeService(Number(challengeId), student_id, submissionData);
    res.status(201).json(submission);
  } catch (error) {
    next(error);
  }
};

export const getChallengeSubmissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { challengeId } = req.params;
    const submissions = await getChallengeSubmissionsService(Number(challengeId));
    res.status(200).json(submissions);
  } catch (error) {
    next(error);
  }
};

export const gradeSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { submissionId } = req.params;
    const gradeData: GradeSubmissionInput = req.body;
    const gradedSubmission = await gradeSubmissionService(Number(submissionId), gradeData);
    res.status(200).json(gradedSubmission);
  } catch (error) {
    next(error);
  }
};
