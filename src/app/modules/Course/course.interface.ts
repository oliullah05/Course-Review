import  { Types } from "mongoose";

type TTag = {
    name: string;
    isDeleted: boolean;
  };
  
  type TCourseDetails = {
    level:string; //  Beginner, Intermediate, Advanced
    description: string;
  };
  
 export  type TCourse = {
    title: string; 
    instructor: string;
    categoryId: Types.ObjectId; 
    price: number;
    tags: TTag[]; 
    startDate: string; 
    endDate: string; 
    language: string; 
    provider: string;
    durationInWeeks: number; 
    details: TCourseDetails; 
  };




  // const exampleCourse: TCourse = {
  //   title: "Introduction to TypeScript",
  //   instructor: "John Doe",
  //   categoryId: `65732dc1f80838072bacadf8`,
  //   price: 29.99,
  //   tags: [{ name: "Programming", isDeleted: false }],
  //   startDate: "2023-01-01",
  //   endDate: "2023-02-01",
  //   language: "English",
  //   provider: "XYZ University",
  //   durationInWeeks: 5,
  //   details: {
  //     level: "Intermediate",
  //     description: "This course covers the basics and advanced concepts of TypeScript."
  //   },
  // };