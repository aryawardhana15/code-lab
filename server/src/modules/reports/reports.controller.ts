import { Request, Response, NextFunction } from 'express';
import { generateUsersReport, generateCoursesReport, generateEnrollmentsReport } from './reports.service';

export const exportReports = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.params;
    let csvData: string;
    let filename: string;

    switch (type) {
      case 'users':
        csvData = await generateUsersReport();
        filename = 'users_report.csv';
        break;
      case 'courses':
        csvData = await generateCoursesReport();
        filename = 'courses_report.csv';
        break;
      case 'enrollments':
        csvData = await generateEnrollmentsReport();
        filename = 'enrollments_report.csv';
        break;
      default:
        return res.status(400).json({ message: 'Invalid report type' });
    }

    res.header('Content-Type', 'text/csv');
    res.attachment(filename);
    res.send(csvData);
  } catch (error) {
    next(error);
  }
};
