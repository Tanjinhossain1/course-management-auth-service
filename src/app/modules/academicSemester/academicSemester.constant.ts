import {
  ICodeAcademicSemesterType,
  ITitleAcademicSemesterType,
  MonthType,
} from './academicSemester.interface';

export const monthsEnum: MonthType[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const titleEnum: ITitleAcademicSemesterType[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const codeEnum: ICodeAcademicSemesterType[] = ['01', '02', '03'];
