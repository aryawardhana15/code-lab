import { Request, Response, NextFunction } from 'express';
import { sendEmail } from './reminders.service';

export const sendReminderEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { to, subject, text, html } = req.body;
    await sendEmail(to, subject, text, html);
    res.status(200).json({ message: 'Reminder email sent successfully!' });
  } catch (error) {
    next(error);
  }
};
