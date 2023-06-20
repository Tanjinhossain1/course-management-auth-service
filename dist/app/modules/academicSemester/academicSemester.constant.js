'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.searchableFields =
  exports.academicSemesterFilterableFields =
  exports.titleCodeMapper =
  exports.codeEnum =
  exports.titleEnum =
  exports.monthsEnum =
    void 0;
exports.monthsEnum = [
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
exports.titleEnum = ['Autumn', 'Summer', 'Fall'];
exports.codeEnum = ['01', '02', '03'];
exports.titleCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
exports.academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
exports.searchableFields = ['title', 'code', 'year'];
