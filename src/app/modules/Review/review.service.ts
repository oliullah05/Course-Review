import mongoose from "mongoose";
import Course from "../Course/course.model";
import { TReview } from "./review.interface";
import Review from "./review.model";
import AppError from "../../errors/appError";

const createReviewIntoDB = async (payload: TReview) => {


  const session = await mongoose.startSession();


try{
  session.startTransaction();
  const result = await Review.create([payload],{session});

if(!result[0]){
  throw new AppError (404,"review can't created")
}



  const findCourse = await Course.findById(result[0].courseId)
  const reviewCount = findCourse.reviewCount+1;
  const rattingSum  = findCourse.ratingSum+result[0].rating;
  const avarageRatting=Math.ceil(rattingSum/reviewCount)
  

   const addingReview =await Course.findByIdAndUpdate(result[0].courseId,{
          reviewCount:reviewCount,averageRating:avarageRatting,ratingSum:rattingSum
        },{
          upsert:true,
          session
        })

if(!addingReview){
  throw new AppError (404,"This course not found")
}

await session.commitTransaction();
await session.endSession();
  return result[0];
}
catch(err){
  await session.abortTransaction();
  await session.endSession();
  throw new AppError (404,"Fail to review")
}


  };
  

const getAllReviewFromDB = async () => {
    const result = await Review.find();
    return result;
  };
  

  export const ReviewServices = {
    createReviewIntoDB,
    getAllReviewFromDB
  };