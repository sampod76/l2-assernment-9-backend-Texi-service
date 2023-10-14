import { ENUM_USER_ROLE } from '../../../enums/users';
import { IAcademicSemester } from '../academicSemester/interface.academicSemester';
import { User } from './users.model';

/* export const generateUserId = async () => {
  //এখানে বুঝানো হয়েছে যে ইউজারের এটা হবে সেটা পাঁচ সংখ্যার হতে হবে | এবং যদি ইউজার আইডি টা এক হয় তাহলে তার সামনে 4 শূন্য দিয়ে বাকিগুলো ভরাট করে দিতে হবে --> (0).toString().padStart(5, '0')
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
  // increment by 1
  const incrementId = (Number(currentId) + 1).toString().padStart(5, '0');
  return incrementId;
};
 */

//STUDENT id make
export const findLastStudentId = async () => {
  const lastUser = await User.findOne(
    { role: ENUM_USER_ROLE.STUDENT },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  //এখানে বুঝানো হয়েছে যে ইউজারের এটা হবে সেটা পাঁচ সংখ্যার হতে হবে | এবং যদি ইউজার আইডি টা এক হয় তাহলে তার সামনে 4 শূন্য দিয়ে বাকিগুলো ভরাট করে দিতে হবে --> (0).toString().padStart(5, '0')
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  // increment by 1
  let incrementId = (Number(currentId) + 1).toString().padStart(5, '0');
  //20 23 --> substring to প্রথম দুইটাকে বাদ দিয়ে লাস্ট পর্যন্ত নিয়ে নেবে |যদি আমি প্রথম দুইটা থেকে লাস্টে কোন ডিজিট বলে দিতে চাই এভাবে দিতে হবে substring(2,6)

  incrementId = `${academicSemester?.year?.substring(2)}${
    academicSemester?.code
  }${incrementId}`;

  return incrementId;
};

// faculty id make
export const findLastFacultyId = async () => {
  const lastUser = await User.findOne(
    { role: ENUM_USER_ROLE.FACULTY },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.substring(1) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  //console.log(currentId); // 00000
  let incrementedId = (Number(currentId) + 1).toString().padStart(5, '0');
  //console.log(incrementedId); //00001
  incrementedId = `F${incrementedId}`;

  return incrementedId;
};

//admin id make
export const findLastAdminId = async () => {
  const lastUser = await User.findOne(
    { role: ENUM_USER_ROLE.ADMIN },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.substring(1) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  //console.log(currentId); // 00000
  let incrementedId = (Number(currentId) + 1).toString().padStart(5, '0');
  //console.log(incrementedId); //00001
  incrementedId = `A${incrementedId}`;

  return incrementedId;
};
