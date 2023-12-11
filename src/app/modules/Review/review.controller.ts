import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
    const result =  await ReviewServices.createReviewIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Review is created succesfully',
      data: result,
    });
  });
  export const ReviewControllers = {
    createReview
  }