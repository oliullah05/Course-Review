import { z} from "zod";

export const ReviewValidationSchema = z.object({
    courseId: z.string({required_error:"courseId is required"}),
    rating: z.number({required_error:"ratting is required"}),
    review: z.string({required_error:"review is required"}),
});