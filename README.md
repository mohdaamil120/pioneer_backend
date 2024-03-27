# Pioneer Backend Project

Welcome to the README file for the Pioneer Backend project. This document provides essential information about the backend development tasks completed as part of the Backend Developer Intern Assessment.

## Project Overview

This project aims to develop a backend system with various functionalities using Node.js, Express.js, and MongoDB Atlas. Below are the tasks accomplished:

- **Task 1: Implement User Authentication with JWT**
  - Implemented JWT authentication for user registration, login, and logout.
  
- **Task 2: Create API Endpoints for Data Retrieval**
  - Developed API endpoints to fetch data from a public API with filtering options based on categories and result limits.

- **Task 3: Implement Swagger Documentation**
  - Documented all API endpoints using Swagger for better understanding and usability. Swagger UI is also integrated for interactive API documentation.

- **Task 4: Secure API Endpoint for Authenticated Users Only**
  - Secured an API endpoint to be accessible only to authenticated users using JWT authentication middleware.

## Project Links

- Deployed Link: [Pioneer Backend Deployment](https://pioneer-backend-9d6u.onrender.com/)
- Swagger Documentation: [Swagger API Documentation](https://pioneer-backend-9d6u.onrender.com/apidocs/)

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- JSON Web Tokens (JWT)
- Bcrypt (for hash the password)
- Cors
- Axios
- Dotenv
- Mongoose
- Nodemon
- swagger-jsdoc
- swagger-ui-express

## API Endpoints

### Authentication Endpoints

- **Register User**: `POST /register`
- **Login User**: `POST /login`
- **Logout User**: `GET /logout`

### Data Retrieval Endpoint

- **Fetch Data**: `GET /data`
  - Parameters: `category`, `limit`

### Secure Endpoint

- **Protected Endpoint**: `GET /secure/protected`

## Setup Instructions

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository_url>
2. Intall dependencies:
   ```bash
   npm install
3. run locally:
   ```bash
   npm run server   
