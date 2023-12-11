/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./Category.service";


const createCategory = catchAsync(async (req, res) => {
  const result =
    await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category is created succesfully',
    data: result,
  });
});

const getAllCategorys = catchAsync(async (req, res) => {
  const result =
    await CategoryServices.getAllCategorysFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categorys are retrieved successfully',
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await CategoryServices.getSingleCategoryFromDB(
      id,
    );
return result 

    })



    const deleteCategory = catchAsync(async (req, res) => {
        const { id } = req.params;
        const result =
          await CategoryServices.deleteCategoryFromDB(
            id
          );
      
        sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'Category is deleted succesfully',
          data: result,
        });
      });


const updateAcademicDeartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await CategoryServices.updateCategoryIntoDB(
      id,
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category is updated succesfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategorys,
  getSingleCategory,
  updateAcademicDeartment,
  deleteCategory
}
