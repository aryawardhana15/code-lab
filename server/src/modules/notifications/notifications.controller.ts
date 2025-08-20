import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../../middlewares/auth';
import {
  getMyNotificationsService,
  markNotificationAsReadService,
} from './notifications.service';

export const getMyNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const user_id = customReq.user!.id;
    const notifications = await getMyNotificationsService(user_id);
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const markNotificationAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest;
    const { id } = req.params;
    const user_id = customReq.user!.id;
    await markNotificationAsReadService(Number(id), user_id);
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    next(error);
  }
};
