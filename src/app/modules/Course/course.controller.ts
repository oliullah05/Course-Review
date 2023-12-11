import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";


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
  const result =
    await CourseServices.getAllCoursesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
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

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await CourseServices.updateCourseIntoDB(
      id,
      req.body,
    );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course is updated succesfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
updateCourse,
};
