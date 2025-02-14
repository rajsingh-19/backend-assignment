# User Authentication API (Express.js, MongoDB, JWT)

## Overview
This is a simple user authentication backend built using Express.js, MongoDB, and JWT. It allows users to:
    
    (1) Register an account.
    (2) Login and receive a JWT token.
    (3) Search for a user by username or email (requires authentication).
    
### Tech Stack
    Backend: Node.js, Express.js
    Database: MongoDB
    Authentication: JWT (JSON Web Token)
    Validation: Express Validator
    Environment Variables: dotenv

## Installation & Setup

1. Clone the Repository

       git clone https://github.com/rajsingh-19/backend-assignment.git
       cd backend-assignment

3. Install Dependencies

        npm install

5. Configure Environment Variables

        Create a .env file in the root directory and add the following:
        PORT=3001
        DB_URL=mongodb://localhost:27017/<database name>
        JWT_SECRET=your_jwt_secret_key

7. Start the Server

       npm start    # Run normally
       npm run dev  # Run with Nodemon for development
