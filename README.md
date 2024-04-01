# Task Manager Application

This is a full-stack task manager application built with Node.js, Express, React, and MongoDB.

## Features

- User authentication and authorization
- Create, read, update, and delete tasks
- Responsive layout
- User-friendly UI
- API endpoints for managing users and tasks

## Technologies Used

- Node.js
- Express.js
- MongoDB
- React.js
- Chakra UI
- Axios
- JSON Web Tokens (JWT) for authentication

## Getting Started

To run this project locally, follow these steps:

1. **Clone this repository** to your local machine:

   ```bash
   git clone <repository-url>

2. **Clone this repository** to your local machine:

   ```bash
    cd backend
    npm install

# API Endpoints

## Users
POST /api/v1/register: Register a new user
POST /api/v1/login: Login user
GET /api/v1/logout: Logout user
GET /api/v1/me: Get user details

## Tasks
GET /api/v1/tasks: Get all tasks onlu logined users data

POST /api/v1/tasks/new: Create a new task
PUT /api/v1/task/:id: Update task
DELETE /api/v1/task/:id: Delete task

# Deployed Application
  ## Backend APIs
The deployed application backend can be accessed at https://taskmanager-4ytt.onrender.com/. The backend API is hosted at backend-url.
## Frontend UI
The deployed application backend can be accessed at https://taskmanagerkamat.netlify.app/. The backend API is hosted at backend-url.