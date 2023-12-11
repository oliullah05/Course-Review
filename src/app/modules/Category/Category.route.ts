import express from 'express';
import { CategoryControllers } from './Category.controller';
import validateRequest from '../../middlewars/validateRequest';
import { createCategoryValidationSchema, updateCategoryValidationSchema } from './Category.validation';


const router = express.Router();
router.get('/categories', CategoryControllers.getAllCategorys);
router.post(
  '/categories',
  validateRequest(createCategoryValidationSchema,
  ),
  CategoryControllers.createCategory,
);

router.get(
  '/categories/:id',
  CategoryControllers.getSingleCategory,
);

router.patch(
  '/categories/:id',
  validateRequest(
    updateCategoryValidationSchema,
  ),
  CategoryControllers.updateAcademicDeartment,
);
router.delete(
  '/categories/:id',
  CategoryControllers.deleteCategory
);



export const CategoryRoutes = router;
