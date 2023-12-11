import Review from "../Review/review.model";
import { TCourse } from "./course.interface";
import Course from "./course.model";


const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await Course.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result =
    await Course.findById(id);
  return result;
};
const getSingleCourseWithReviewsFromDB = async (id: string) => {
  const courseData = await Course.findById(id)
  const reviewData = await Review.findOne({courseId:id})
 const result = {
  course:courseData,
  reviews:reviewData
 }
return result

};

const updateCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const result = await Course.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  getSingleCourseWithReviewsFromDB
};
