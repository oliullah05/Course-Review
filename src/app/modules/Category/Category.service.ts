import { TCategory } from "./Category.interface";
import { Category } from "./Category.model";


const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategorysFromDB = async () => {
  const result = await Category.find()
  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id)
  return result;
};
const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id)
  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const result = await Category.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategorysFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB
};
