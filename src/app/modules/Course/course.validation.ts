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

  tags: z.array(tagSchema,{required_error:"Tags is required"}),

  startDate: z.string({ required_error: 'Start date is required' }),
  endDate: z.string({ required_error: 'End date is required' }),
  language: z.string({ required_error: 'Language is required' }),
  provider: z.string({ required_error: 'Provider is required' }),
  details: z.object({
    name: z.string({ required_error: 'Tag name is required' }),
    isDeleted: z.boolean().optional().default(false),
    
   
  })
}).refine(data => data.details !== undefined, { message: 'Details are required' });


