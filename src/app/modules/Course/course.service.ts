/* eslint-disable prefer-const */


import AppError from "../../errors/appError";
import Review from "../Review/review.model";
import { TCourse } from "./course.interface";
import Course from "./course.model";


const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  if (result) {
    const deleteaverageRatingreviewCount = await Course.findById(result._id, { averageRating: 0, reviewCount: 0, ratingSum: 0 })
    return deleteaverageRatingreviewCount;
  }
};

const getAllCoursesFromDB = async (query:Record<string,unknown>) => {
  let result =  Course.find();
  if(!query){
     result = Course.find();
  }
  const {page=1,limit=10}= query;


if(limit){
  result = result.limit(Number(limit))
}
if(page){
  const queryPage = Number(page) || 1;
  const queryLimit = Number(limit) || 10;
  const skip = Number((queryPage - 1) * queryLimit);
  result =  result.skip(skip).limit(queryLimit)
}


  return await result;
};










const getSingleCourseFromDB = async (id: string) => {
  const result =
    await Course.findById(id);
  return result;
};
const getSingleCourseWithReviewsFromDB = async (id: string) => {
  const courseData = await Course.findById(id)
  const reviewData = await Review.find({ courseId: id })
  const result = {
    course: courseData,
    reviews: reviewData
  }
  return result

};
const getBestCourseBasedOnAvarageReviewsFromDB = async () => {
  let averageRating;
  let reviewCount;
  const result = await Course.findOne().sort({ averageRating: -1 })
  averageRating = result?.averageRating
  reviewCount = result?.reviewCount

  const removeAllRattingProperty = await Course.findOne().sort({ averageRating: -1 }).select('-reviewCount -averageRating -ratingSum').exec()
  return {
    "course": removeAllRattingProperty,
    "averageRating": averageRating,
    "reviewCount": reviewCount
  }

};






const updateCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
 
const {tags,details,...remainingData } =payload;


const modifiedUpdatedData: Record<string, unknown> = {
  ...remainingData,
};


if (details && Object.keys(details).length) {
  for (const [key, value] of Object.entries(details)) {
    modifiedUpdatedData[`details.${key}`] = value;
  }
}

  const result = await Course.findByIdAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true
    },
  );


if(!result){
  throw new AppError(404,"update fail")
}


// .............................................Course..


if (tags && tags.length > 0) {
  //filter out the deletd files
  const filterDeletedTags = tags.filter(elem => elem.name && elem.isDeleted).map(el => el.name)
  const deleteTags = await Course.findByIdAndUpdate(id, {
      $pull: {
        tags: { name: { $in: filterDeletedTags } },
      },
  },
      {
          new: true,
          runValidators: true,
      }
  
  )

  if(!deleteTags){
      throw new AppError(404,"fail to update course")
  }

  const filterUndeltedTags = tags?.filter(
      (el) => el.name && !el.isDeleted
  );


  const addingTags = await Course.findByIdAndUpdate(id, {
      $addToSet: { tags: { $each: filterUndeltedTags } }
  },
      {
          new: true,
          runValidators: true
      })

      if(!addingTags){
          throw new AppError(404,"fail to update course")
      }

      return addingTags;
}



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
