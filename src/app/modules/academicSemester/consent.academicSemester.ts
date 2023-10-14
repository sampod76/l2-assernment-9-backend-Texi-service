import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
} from './interface.academicSemester';

export const ACADEMIC_SEMESTER_MONTH: IAcademicSemesterMonth[] = [
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

export const ACADEMIC_SEMESTER_TITLE: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const ACADEMIC_SEMESTER_CODE: IAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];

// export const academicSemesterTitleCodeMapper: {
export const ACADEMIC_SEMESTER_TITLE_CODE_MAPPER: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

// export  const academicSemesterSearchableFields = ['title', 'code', 'year'];
export const ACADEMIC_SEMESTER_SEARCHABLE_FIELDS = ['title', 'code', 'year'];

export const ACADEMIC_SEMESTER_FILTERABLE_FIELDS = [
  'searchTerm',
  'year',
  'code',
  'title',
];
