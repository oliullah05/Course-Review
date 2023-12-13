/* eslint-disable prefer-const */


import AppError from "../../errors/appError";
import Review from "../Review/review.model";
import { TCourse } from "./course.interface";
import Course from "./course.model";

let metaData:[unknown]= [{}];
const createCourseIntoDB = async (payload: TCourse) => {
  if(payload.durationInWeeks){
    throw new AppError(404,"durationInWeeks can't be added")
  }
  const result = await Course.create(payload);
  if (result) {
    const hideProperty = await Course.findById(result._id, { averageRating: 0, reviewCount: 0, ratingSum: 0,createdAt:0,__v:0,updatedAt:0,id:0})
    return hideProperty;
  }
};




const getAllCoursesFromDB = async (query:Record<string,unknown>) => {
  


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


let skip = (page - 1) * limit;

console.log(skip);
let pipeline = [];

// Sorting
if ( query.sortBy) {

  let sortOrder =  query.sortOrder == 'desc' ? -1 : 1;
  pipeline.push({ $sort: { [ query.sortBy]: sortOrder } });
}

// Filtering
let matchQuery = {};

if ( query.minPrice || query.maxPrice) {
  matchQuery.price = {};
  if ( query.minPrice) matchQuery.price.$gte = Number( query.minPrice);
  if ( query.maxPrice) matchQuery.price.$lte = Number( query.maxPrice);
 
}






if (query.startDate ) {

  if (query.startDate) matchQuery.startDate = query.startDate;

}
if( query.endDate){
  if (query.endDate) matchQuery.endDate = query.endDate;
}




if (query.language ) {

  if (query.language) matchQuery.language = query.language;
}


if (query.provider ) {

  if (query.provider) matchQuery.provider = query.provider;
}



if ( query.tags) {
  pipeline.push({
    $match: {
        "tags.name": query.tags
    }
})
}


if ( query.level) {
  pipeline.push({
    $match: {
        "details.level": query.level
    }
})
}



if (Object.keys(matchQuery).length > 0) {
  pipeline.push({ $match: matchQuery });
}


//add virtual propery

pipeline.push({ $addFields: { durationInWeeks: '$durationInWeeks' } });



pipeline.push({ $skip: skip }, { $limit: limit });

// $project to exclude fields
// pipeline.push({
//   $project: {
//     __v: 0,
//     ratingSum: 0,
//     averageRating: 0,
//     reviewCount: 0,
//   },
// });

console.log(999,pipeline,9999);
const result = await Course.aggregate(pipeline);


// to show virtuals
let courses = result.map(result => {
  const course = new Course(result);
  return course.toObject({ virtuals: true });
});



if(query.durationInWeeks){
  courses =  courses.filter(lm=>lm?.durationInWeeks===Number(query.durationInWeeks))
}




metaData.push({
  page: page,
  limit: limit
})

 return  courses



  
};










const getSingleCourseFromDB = async (id: string) => {
  const result =
    await Course.findById(id);
  return result;
};
const getSingleCourseWithReviewsFromDB = async (id: string) => {
  const courseData = await Course.findById(id,{ reviewCount: 0, averageRating: 0, __v: 0, updatedAt: 0, createdAt: 0, ratingSum: 0 })
  const reviewData = await Review.find({ courseId: id },{_id:0,id:0,__v:0})
  const result = {
    course: courseData,
    reviews: reviewData
  }
  if(!courseData){
    throw new AppError(404,"Data get fail . Id not match")
  }
  return result

};





const getBestCourseBasedOnAvarageReviewsFromDB = async () => {
  let averageRating;
  let reviewCount;
  const result = await Course.findOne().sort({ averageRating: -1 })
  averageRating = result?.averageRating
  reviewCount = result?.reviewCount

  const removeAllRattingProperty = await Course.findOne().sort({ averageRating: -1 }).select('-reviewCount -averageRating -ratingSum -__v -updatedAt -createdAt').exec()
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
      runValidators: true,
    },
  );


if(!result){
  throw new AppError(404,"update fail . Id not match")
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
  getBestCourseBasedOnAvarageReviewsFromDB,
  metaData
};