import { Schema, model } from "mongoose";
import { TCategory } from "./Category.interface";
import AppError from "../../errors/appError";



const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    }
});


    categorySchema.pre('save', async function (next) {
        const isCategoryExist = await Category.findOne({
          name: this.name,
        });
      
        if (isCategoryExist) {
          throw new AppError(
            404,
            'Category is already exist!',
          );
        }
      
        next();
      });


export const Category = model<TCategory>(
  'Category',
  categorySchema,
);
