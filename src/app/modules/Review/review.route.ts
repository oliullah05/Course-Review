import express from 'express';



import { ReviewControllers } from './review.controller';
import validateRequest from '../../middlewars/validateRequest';
import { ReviewValidationSchema } from './review.validation';


const router = express.Router();
// router.get('/reviews', ReviewControllers.createReview);
router.post(
  '/reviews',
  validateRequest(ReviewValidationSchema),
  ReviewControllers.createReview
);



export const ReviewRoutes = router;
