import { Request, Response, NextFunction } from 'express';
import { getLeaderboardData } from './leaderboard.service';

export const getLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboard = await getLeaderboardData();
    res.status(200).json(leaderboard);
  } catch (error) {
    next(error);
  }
};
