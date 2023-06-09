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

export const titleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];

export const searchableFields = ['title', 'code', 'year'];
