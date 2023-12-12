import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const TReviewSchema = new Schema<TReview,TReviewModel>({
    courseId: { type: Schema.Types.ObjectId, required: [true,"courseId is required"] },
    rating: { type: Number, required: [true,"ratting is required"] },
    review: { type: String, required: [true,"review is required"] },
});







const Review = model<TReview,TReviewModel>("Review", TReviewSchema);

export default Review;