'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.studentFilterableFields =
  exports.studentSearchableFields =
  exports.BLOOD_GROUP =
  exports.GENDER =
    void 0;
exports.GENDER = ['male', 'female'];
exports.BLOOD_GROUP = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.studentSearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.fisrtName',
  'name.middleName',
  'name.lastName',
];
exports.studentFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];
