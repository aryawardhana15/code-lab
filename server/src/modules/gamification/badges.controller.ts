import { Request, Response, NextFunction } from 'express';
import { getAllBadges, assignBadgeToUser, revokeBadgeFromUser } from './badges.service';

export const getBadges = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const badges = await getAllBadges();
    res.status(200).json(badges);
  } catch (error) {
    next(error);
  }
};

export const assignBadge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, badgeId } = req.body;
    const userBadge = await assignBadgeToUser(userId, badgeId);
    res.status(201).json(userBadge);
  } catch (error) {
    next(error);
  }
};

export const revokeBadge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, badgeId } = req.body;
    await revokeBadgeFromUser(userId, badgeId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
