import { query } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";
import Course from "./course.model";


const createCourse = catchAsync(async (req, res) => {
  const result =
    await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course is created succesfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  //metaData recive from service
  const metaData = CourseServices.metaData
  const showMetaData = metaData[metaData.length - 1]


  //get total in database 
  const totalDataInDatabase = await (await Course.find()).length



  sendResponse(res, {
    statusCode: 200,
    success: true,
    meta: {
      page: showMetaData?.page,
      limit: showMetaData?.limit,
      total: totalDataInDatabase
    },
    message: 'Courses are retrieved successfully',
    data: result,
  });
});


const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await CourseServices.getSingleCourseFromDB(
      id,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is retrieved succesfully',
    data: result,
  });
});




const getBestCourseBasedOnAvarageReview = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseBasedOnAvarageReviewsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Best Course with Avarage Review is retrieved succesfully',
    data: result,
  });
});



const getSingleCourseWithReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await CourseServices.getSingleCourseWithReviewsFromDB(id);


  const copyData = { ...result }
  console.log(copyData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course and review  is retrieved succesfully',
    data: result,
  });
});




const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await CourseServices.updateCourseIntoDB(
      id,
      req.body,
    );

  const removeData = await Course.findById(result._id, { reviewCount: 0, averageRating: 0, __v: 0, updatedAt: 0, createdAt: 0, ratingSum: 0 })


  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is updated succesfully',
    data: removeData,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  getSingleCourseWithReview,
  getBestCourseBasedOnAvarageReview
};