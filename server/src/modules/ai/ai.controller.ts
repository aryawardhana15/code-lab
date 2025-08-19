import { Request, Response, NextFunction } from 'express';
import { getAICompletion } from './ai.service';

export const getAIResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }
    const response = await getAICompletion(prompt);
    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};
