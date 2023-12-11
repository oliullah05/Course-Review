import { Schema, Types, model } from "mongoose";
import { TCourse } from "./course.interface";
import AppError from "../../errors/appError";
import Review from "../Review/review.model";


const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        unique: true
    },
    instructor: {
        type: String,
        required: [true, 'Instructor is required']
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Category ID is required'],
        ref:"Category"
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },


    tags: [

        {
            name: {
                type: String,
                required: [true, 'Tag name is required']
            },
            isDeleted: {
                type: Boolean,
                default: false
            }
        }
    ],


    startDate: {
        type: String,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: String,
        required: [true, 'End date is required']
    },
    language: {
        type: String,
        required: [true, 'Language is required']
    },
    provider: {
        type: String,
        required: [true, 'Provider is required']
    },
    details: {
        level: {
            type: String, required: [true, 'Course level is required']
        },
        description: {
            type: String, required: [true, 'Course description is required']
        },
    },
},{
    timestamps:true,
    virtuals:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
});


courseSchema.pre('save', async function (next) {
    const isCategoryExist = await Course.findOne({
        title: this.title, 
    });
  
    if (isCategoryExist) {
      throw new AppError(
        404,
        'Title is already exist!',
      );
    }
  
    next();
  });

  courseSchema.virtual('averageRating').get(async function () {
    return 8
  });;

//   courseSchema.virtual('averageRating2').get(async function () {

//     return 88888
//   });




courseSchema.virtual('fullName').get(async function () {
    let reviewCount = 0;
    let totalRating = 0;
    const courseId:Types.ObjectId = this?._id;
    const findReviews = await Review.find({courseId:courseId})
    findReviews.forEach(review=>{
        reviewCount++;
        totalRating=totalRating+review.rating
    })
    const reviewAvarage = Number(totalRating)/Number(reviewCount)
    console.log(reviewCount,totalRating,reviewAvarage);
    
    return reviewAvarage
  });




const Course = model<TCourse>('Course', courseSchema);

export default Course;