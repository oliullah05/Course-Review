/* eslint-disable prefer-const */


import AppError from "../../errors/appError";
import Review from "../Review/review.model";
import { TCourse } from "./course.interface";
import Course from "./course.model";


const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  if (result) {
    const hideAverageRatingreviewCount = await Course.findById(result._id, { averageRating: 0, reviewCount: 0, ratingSum: 0})
    return hideAverageRatingreviewCount;
  }
};

const getAllCoursesFromDB = async (query:Record<string,unknown>) => {
  
const  result =await Course.find();


//   if(!query){
//      result = Course.find();
//   }
//   const {page=1,limit=10,sortBy,sortOrder}= query;


//  if(limit){
//   result = result.limit(Number(limit))
// }
// if(page){
//   const queryPage = Number(page) || 1;
//   const queryLimit = Number(limit) || 10;
//   const skip = Number((queryPage - 1) * queryLimit);
//   result =  result.skip(skip).limit(queryLimit)
// }

// let sortOrder = -1;

// if(sortBy){
//   result = result.sort({title:-1})
// }







let page = Number( query.page) || 1;
let limit = Number( query.limit) || 10;

// Calculate the skip value for pagination
let skip = (page - 1) * limit;

// Build the aggregation pipeline based on the query parameters
let pipeline = [];

// Sorting
if ( query.sortBy) {

  let sortOrder =  query.sortOrder == 'desc' ? -1 : 1;
  pipeline.push({ $sort: { [ query.sortBy]: sortOrder } });
}

// Filtering
let matchQuery = {};

if ( query.minPrice ||  query.maxPrice) {
  // matchQuery.price = {};
  if ( query.minPrice) matchQuery.price.$gte = Number( query.minPrice);
  if ( query.maxPrice) matchQuery.price.$lte = Number( query.maxPrice);
}

if (query.startDate || query.endDate) {
  // matchQuery.startDate = {};
  if (query.startDate) matchQuery.startDate = query.startDate;
  if (query.endDate) matchQuery.endDate = query.endDate;
}



if (query.language ) {
  // matchQuery.language = {};
  if (query.language) matchQuery.language = query.language;
}
if (query.provider ) {
  // matchQuery.provider = {};
  if (query.provider) matchQuery.provider = query.provider;
}
// if (query.durationInWeeks) {
//   // matchQuery.durationInWeeks = {};
//   if (query.durationInWeeks) matchQuery.durationInWeeks = query.durationInWeeks;
// }





// if ( query.tags) {
//   matchQuery.tags =  query.tags;
// }

// Add other filtering conditions based on your schema fields

if (Object.keys(matchQuery).length > 0) {
  pipeline.push({ $match: matchQuery });
}
// console.log(matchQuery);
// Pagination

pipeline.push({ $addFields: { durationInWeeks: '$durationInWeeks' } });






// pipeline.push({
//   $match: {
//     $expr: { $eq: ["$price", 59.99] }
//   }
// });

// pipeline.push({
//   $addFields: {
//     show: true
//   }
// });





pipeline.push({ $skip: skip }, { $limit: limit });

// Execute the aggregation pipeline
const rawResults = await Course.aggregate(pipeline);

// Map the results and include virtuals
const courses = rawResults.map(result => {
  const course = new Course(result);
  return course.toObject({ virtuals: true });
});








if(query.durationInWeeks){
  console.log(query.durationInWeeks,55);
const durationInWeeksFilter =  courses.filter(lm=>lm?.durationInWeeks===Number(query.durationInWeeks))
return durationInWeeksFilter;
}

else{
  return courses
}


  
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
