import Review from "../Review/review.model";
import { TCourse } from "./course.interface";
import Course from "./course.model";


const createCourseIntoDB = async (payload: TCourse)=> {
  const result = await Course.create(payload);
 if(result){
  const deleteaverageRatingreviewCount = await Course.findById(result._id,{averageRating:0,reviewCount:0,ratingSum:0})
  return deleteaverageRatingreviewCount;
 }
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
  const reviewData = await Review.find({courseId:id})
 const result = {
  course:courseData,
  reviews:reviewData
 }
return result

};
const getBestCourseBasedOnAvarageReviewsFromDB = async () => {
 let averageRating;
  let reviewCount;
  const result = await Course.findOne().sort({averageRating:-1})
  averageRating = result?.averageRating
  reviewCount= result?.reviewCount

  const removeAllRattingProperty = await Course.findOne().sort({averageRating:-1}).select('-reviewCount -averageRating -ratingSum').exec()
 return {
  "course":removeAllRattingProperty,
   "averageRating": averageRating,
   "reviewCount": reviewCount
 }

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
  getSingleCourseWithReviewsFromDB,
  getBestCourseBasedOnAvarageReviewsFromDB
};
