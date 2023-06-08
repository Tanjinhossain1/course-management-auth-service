import { Model } from 'mongoose';

export type MonthType =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type ITitleAcademicSemesterType = 'Autumn' | 'Summer' | 'Fall';
export type ICodeAcademicSemesterType = '01' | '02' | '03';

export type IAcademicSemesterType = {
  title: ITitleAcademicSemesterType;
  year: number;
  code: ICodeAcademicSemesterType;
  startMonth: MonthType;
  endMonth: MonthType;
};

export type AcademicSemesterModel = Model<IAcademicSemesterType>;
