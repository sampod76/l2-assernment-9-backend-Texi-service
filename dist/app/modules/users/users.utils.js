'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateAdminId =
  exports.findLastAdminId =
  exports.generateFacultyId =
  exports.findLastFacultyId =
  exports.generateStudentId =
  exports.findLastStudentId =
    void 0;
const users_1 = require('../../../enums/users');
const users_model_1 = require('./users.model');
/* export const generateUserId = async () => {
  //এখানে বুঝানো হয়েছে যে ইউজারের এটা হবে সেটা পাঁচ সংখ্যার হতে হবে | এবং যদি ইউজার আইডি টা এক হয় তাহলে তার সামনে 4 শূন্য দিয়ে বাকিগুলো ভরাট করে দিতে হবে --> (0).toString().padStart(5, '0')
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
  // increment by 1
  const incrementId = (Number(currentId) + 1).toString().padStart(5, '0');
  return incrementId;
};
 */
//STUDENT id make
const findLastStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield users_model_1.User.findOne(
      { role: users_1.ENUM_USER_ROLE.STUDENT },
      { id: 1, _id: 0 }
    )
      .sort({ createdAt: -1 })
      .lean();
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id)
      ? lastUser.id.substring(4)
      : undefined;
  });
exports.findLastStudentId = findLastStudentId;
const generateStudentId = academicSemester =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //এখানে বুঝানো হয়েছে যে ইউজারের এটা হবে সেটা পাঁচ সংখ্যার হতে হবে | এবং যদি ইউজার আইডি টা এক হয় তাহলে তার সামনে 4 শূন্য দিয়ে বাকিগুলো ভরাট করে দিতে হবে --> (0).toString().padStart(5, '0')
    const currentId =
      (yield (0, exports.findLastStudentId)()) ||
      (0).toString().padStart(5, '0');
    // increment by 1
    let incrementId = (Number(currentId) + 1).toString().padStart(5, '0');
    //20 23 --> substring to প্রথম দুইটাকে বাদ দিয়ে লাস্ট পর্যন্ত নিয়ে নেবে |যদি আমি প্রথম দুইটা থেকে লাস্টে কোন ডিজিট বলে দিতে চাই এভাবে দিতে হবে substring(2,6)
    incrementId = `${
      (_a =
        academicSemester === null || academicSemester === void 0
          ? void 0
          : academicSemester.year) === null || _a === void 0
        ? void 0
        : _a.substring(2)
    }${
      academicSemester === null || academicSemester === void 0
        ? void 0
        : academicSemester.code
    }${incrementId}`;
    return incrementId;
  });
exports.generateStudentId = generateStudentId;
// faculty id make
const findLastFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield users_model_1.User.findOne(
      { role: users_1.ENUM_USER_ROLE.FACULTY },
      { id: 1, _id: 0 }
    )
      .sort({ createdAt: -1 })
      .lean();
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id)
      ? lastUser.id.substring(1)
      : undefined;
  });
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastFacultyId)()) ||
      (0).toString().padStart(5, '0');
    //console.log(currentId); // 00000
    let incrementedId = (Number(currentId) + 1).toString().padStart(5, '0');
    //console.log(incrementedId); //00001
    incrementedId = `F${incrementedId}`;
    return incrementedId;
  });
exports.generateFacultyId = generateFacultyId;
//admin id make
const findLastAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield users_model_1.User.findOne(
      { role: users_1.ENUM_USER_ROLE.ADMIN },
      { id: 1, _id: 0 }
    )
      .sort({ createdAt: -1 })
      .lean();
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id)
      ? lastUser.id.substring(1)
      : undefined;
  });
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastFacultyId)()) ||
      (0).toString().padStart(5, '0');
    //console.log(currentId); // 00000
    let incrementedId = (Number(currentId) + 1).toString().padStart(5, '0');
    //console.log(incrementedId); //00001
    incrementedId = `A${incrementedId}`;
    return incrementedId;
  });
exports.generateAdminId = generateAdminId;
