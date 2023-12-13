import { z } from 'zod';

const tagSchema = z.object({
  name: z.string({ required_error: 'Tag name is required' }),
  isDeleted: z.boolean().optional().default(false),
});


export const CourseValidationSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  instructor: z.string({ required_error: 'Instructor is required' }),
  categoryId: z.string({ required_error: 'categoryId is required' }),
  price: z.number({ required_error: 'Price is required' }),

  tags: z.array(tagSchema),

  startDate: z.string({ required_error: 'Start date is required' }),
  endDate: z.string({ required_error: 'End date is required' }),
  language: z.string({ required_error: 'Language is required' }),
  provider: z.string({ required_error: 'Provider is required' }),
  reviewCount:z.number().default(0),
     averageRating:z.number().default(0),
     ratingSum:z.number().default(0),
  details: z.object({
    level: z.string({ required_error: 'level is required' }),
    description: z.string({required_error:"description is required"})
  })
})



// ._def............tagSchema...............tagSchema.........



const updateTagSchema = z.object({
  name: z.string({ required_error: 'Tag name is required' }).optional(),
  isDeleted: z.boolean().optional().default(false),
});

export const  updateCourseValidationSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).optional(),
  instructor: z.string({ required_error: 'Instructor is required' }).optional(),
  categoryId: z.string({ required_error: 'categoryId is required' }).optional(),
  price: z.number({ required_error: 'Price is required' }).optional(),
  tags: z.array(updateTagSchema).optional(),
  startDate: z.string({ required_error: 'Start date is required' }).optional(),
  endDate: z.string({ required_error: 'End date is required' }).optional(),
  language: z.string({ required_error: 'Language is required' }).optional(),
  provider: z.string({ required_error: 'Provider is required' }).optional(),
  reviewCount: z.number().default(0).optional(),
  averageRating: z.number().default(0).optional(),
  ratingSum: z.number().default(0).optional(),
  details: z.object({
      level: z.string({ required_error: 'level is required' }).optional(),
      description: z.string({ required_error: "description is required" }).optional(),
  }).optional(),
});

