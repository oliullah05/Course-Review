# Course-Review

Developed a Node.js Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for Course Review.

## Live Site

[Live Site](https://level2a2.vercel.app/)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/oliullah05/Course-Review.git
   ```

2. **Install Dependencies:**

   ```bash
   cd your-repository
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root of your project and configure any necessary environment variables.

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/your-database
   NODE_ENV= development
   ```

4. **Run the Application:**

   ```bash
   npm run dev
   ```

   Your application should now be running on [http://localhost:5000](http://localhost:5000).

## API Endpoints

- Create a Course Endpoint: POST /api/course
- Get Paginated and Filtered Courses Endpoint: GET /api/courses
- Create a Category Endpoint: POST /api/categories
- Get All Categories Endpoint: GET /api/categories
- Create a Review Endpoint: POST /api/reviews
- Update a Course (Partial Update with Dynamic Update)\*\* Endpoint: PUT /api/courses/:courseId
- Get Course by ID with Reviews\*\* Endpoint: GET /api/courses/:courseId/reviews
- Get the Best Course Based on Average Review (Rating) Endpoint: GET /api/course/best

**Regards**,

Oliullah Bhuiyan
