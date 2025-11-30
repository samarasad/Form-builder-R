# Dynamic Form Builder

A **full-stack dynamic form builder** that allows rendering forms from backend schemas, submitting data with robust validation, and viewing submissions in a paginated, sortable table. Built with **Node.js, Express, MongoDB**, and modern frontend technologies.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Tech Stack](#tech-stack)  
3. [Architecture & Flow](#architecture--flow)  
4. [Features](#features)  
5. [Installation](#installation)  
6. [API Endpoints](#api-endpoints)  
7. [Example Requests & Responses](#example-requests--responses)  
8. [Validation Rules](#validation-rules)  
9. [Database Design](#database-design)  
10. [Best Practices Implemented](#best-practices-implemented)  
11. [Future Enhancements](#future-enhancements)  

---

## Project Overview

### The **Dynamic Form Builder** project allows administrators to define forms via JSON schemas. Users can

- Render forms dynamically in the frontend based on the schema  
- Fill and submit form data with **real-time validation**  
- View all submitted data in a **paginated and sortable table**  

The backend ensures robust validation using **AJV**, stores submissions in **MongoDB**, and returns appropriate HTTP responses.  

---

## Tech Stack

-*Frontend:**  

- React.js  
- TanStack Query (data fetching)  
- TanStack Form (form state management)  
- TanStack Table (submissions table rendering)  

-*Backend:**  

- Node.js  
- Express.js  
- MongoDB with Mongoose ODM  
- AJV for JSON validation  

-*Other:**  

- Centralized error handling middleware  
- Router-based API structure  
- HTTPS-ready responses  
- Indexed MongoDB fields for optimized queries  

---

## Architecture & Flow

-*Step 1: Fetch Form Schema**  
- User opens the form page → frontend requests `/api/form-schema/get/schema`  
- Backend returns JSON schema → frontend renders dynamic form with validation  

-*Step 2: Submit Form**  
- User fills and submits the form → frontend sends POST request to `/api/form-submissions/post/submission`  
- Backend validates data → stores in MongoDB → returns `submissionId` and timestamp  
- Frontend shows success message  

-*Step 3: View Submissions**  
- User opens submissions page → frontend requests `/api/get-submissions/get/submissions?page=1&sortBy=createdAt&sortOrder=desc`  
- Backend queries database → returns paginated and sorted submissions  
- Frontend renders table  
Features
Dynamic form rendering from backend JSON schema

### 8 input types supported

text, number, select, multi-select, date, textarea, switch

Frontend and backend validation (AJV)

Paginated and sortable submissions table

Centralized error handling

Router-based modular backend structure

Indexed MongoDB fields for faster queries

HTTPS-ready responses

Installation
Clone repository

bash
Copy code
git clone https://github.com/username/dynamic-form-builder.git
cd dynamic-form-builder
Install dependencies

bash
Copy code
npm install
Setup environment variables (.env)

ini
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/dynamic-form
Run backend server

bash
Copy code
npm run dev
Run frontend

bash
Copy code
cd client
npm install
npm start
API Endpoints
Method	Endpoint	Description
GET	/api/form-schema/get/schema	Fetch JSON schema for dynamic form
POST	/api/form-submissions/post/submission	Submit filled form
GET	/api/get-submissions/get/submissions	Fetch paginated, sorted submissions

Example Requests & Responses
1. GET Form Schema
### Request

http
Copy code
GET http://localhost:3000/api/form-schema/get/schema
### Response

json
Copy code
{
  "success": true,
  "message": "Form schema retrieved successfully",
  "data": {
    "title": "Employee Onboarding Form",
    "description": "Please fill out the following details accurately.",
    "fields": [
      {
        "name": "fullName",
        "label": "Full Name",
        "type": "text",
        "placeholder": "Enter full name",
        "required": true,
        "validations": { "minLength": 3, "maxLength": 50 }
      },
      {
        "name": "email",
        "label": "Email Address",
        "type": "text",
        "placeholder": "example@company.com",
        "required": true,
        "validations": { "regex": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" }
      }
    ]
  }
}
2. POST Form Submission
### Request

http
Copy code
POST http://localhost:3000/api/form-submissions/post/submission
Content-Type: application/json

{
  "fullName": "MITHUN",
  "email": "parker.doe@company.com",
  "age": 44,
  "department": "Engineering",
  "skills": ["JavaScript"],
  "joiningDate": "2024-05-10",
  "address": "BLR"
}
### Success Response (201 Created)

json
Copy code
{
  "success": true,
  "submissionId": "2da874d3-8a93-4f51-9e1c-69c8b2746e3d",
  "createdAt": "2025-11-30T18:00:41.001Z"
}
### Error Response (400 Bad Request)

json
Copy code
{
  "success": false,
  "errors": {
    "skills": "must be string"
  }
}
3. GET Submissions
### Request

http
Copy code
GET http://localhost:3000/api/get-submissions/get/submissions?page=1&sortBy=createdAt&sortOrder=desc
### Response (201 Created)

json
Copy code
{
  "success": true,
  "message": "Submissions fetched successfully",
  "submissions": [
    {
      "_id": "692c86499d8c762131555d36",
      "submissionId": "2da874d3-8a93-4f51-9e1c-69c8b2746e3d",
      "createdAt": "2025-11-30T18:00:41.001Z",
      "formData": {
        "fullName": "MITHUN",
        "email": "parker.doe@company.com",
        "age": 44,
        "department": "Engineering",
        "skills": "JavaScript",
        "joiningDate": "2024-05-10",
        "address": "BLR"
      },
      "__v": 0
    }
  ]
}
Validation Rules
Text Fields: minLength, maxLength, regex

Number Fields: min, max

Select / Multi-Select: minSelected, maxSelected

Date Fields: minDate, maxDate

Required Fields: Must be present and non-empty

Backend uses AJV to enforce all validation rules, returning structured errors for frontend display.

Database Design
Submissions Collection

json
Copy code
{
  "_id": "ObjectId",
  "submissionId": "UUID",
  "createdAt": "Date",
  "formData": {
    "fullName": "MITHUN",
    "email": "parker.doe@company.com",
    "age": 44,
    "department": "Engineering",
    "skills": "JavaScript",
    "joiningDate": "2024-05-10",
    "address": "BLR"
  }
}
Indexed createdAt for faster queries

formData field is flexible to store dynamic form inputs