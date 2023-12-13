import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewars/validateRequest';
import { CourseValidationSchema, updateCourseValidationSchema } from './course.validation';



const router = express.Router()
// ,validateRequest(CourseValidationSchema)
router.post(
    '/course',validateRequest(CourseValidationSchema), CourseControllers.createCourse
);
router.get('/courses',CourseControllers.getAllCourses);

router.get(
    '/courses/:id',CourseControllers.getSingleCourse
);

router.get(
    '/courses/:id/reviews',CourseControllers.getSingleCourseWithReview
);


router.get(
    '/course/best',CourseControllers.getBestCourseBasedOnAvarageReview
);


router.put(
    '/courses/:id',validateRequest(updateCourseValidationSchema),CourseControllers.updateCourse
);


export const CourseRoutes = router;
