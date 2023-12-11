import { z } from 'zod';

export const createCategoryValidationSchema = z.object({
  name: z.string(),
});
export const updateCategoryValidationSchema = z.object({
  name: z.string().optional(),
});

