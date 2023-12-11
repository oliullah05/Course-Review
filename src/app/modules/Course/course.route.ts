import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewars/validateRequest';
import { CourseValidationSchema } from './course.validation';



const router = express.Router()
// ,validateRequest(CourseValidationSchema)
router.post(
    '/course',validateRequest(CourseValidationSchema), CourseControllers.createCourse
);
router.get('/courses',CourseControllers.getAllCourses);

router.get(
    '/courses/:id',CourseControllers.getSingleCourse
);

router.patch(
    '/courses/:id',CourseControllers.updateCourse,
);


export const CourseRoutes = router;
