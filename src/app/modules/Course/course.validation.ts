import { z } from 'zod';

const tagSchema = z.object({
  name: z.string({ required_error: 'Tag name is required' }),
  isDeleted: z.boolean().optional().default(false),
});

const detailsSchema = z.object({
  level: z.string({ required_error: 'Course level is required' }),
  description: z.string({ required_error: 'Course description is required' }),
});

export const CourseValidationSchema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  instructor: z.string({ required_error: 'Instructor is required' }),
  categoryId: z.string(),
  price: z.number({ required_error: 'Price is required' }),

  tags: z.array(tagSchema),

  startDate: z.string({ required_error: 'Start date is required' }),
  endDate: z.string({ required_error: 'End date is required' }),
  language: z.string({ required_error: 'Language is required' }),
  provider: z.string({ required_error: 'Provider is required' }),
  details: detailsSchema,
});


