# Dynamic Form Builder

A full-stack dynamic form builder system with JSON-based schema rendering, AJV validation, paginated submissions, and modular backend architecture.

## Architecture & Flow

### Step 1: Fetch Form Schema
- User opens the form page → frontend requests: GET /api/form-schema/get/schema
- Backend returns JSON schema
- Frontend renders dynamic form with validation

### Step 2: Submit Form
- User submits → frontend sends: POST /api/form-submissions/post/submission
- Backend validates with AJV, stores data, returns submissionId + timestamp
- Frontend shows success

### Step 3: View Submissions
- Frontend requests: GET /api/get-submissions/get/submissions?page=1&sortBy=createdAt&sortOrder=desc
- Backend returns paginated & sorted submissions
- Frontend renders table

## Features
- Dynamic form rendering from backend JSON schema
- Supports 8 input types: text, number, select, multi-select, date, textarea, switch
- Frontend + backend validation with AJV
- Paginated + sortable submissions table
- Centralized error handling
- Modular backend router structure
- Indexed fields in MongoDB
- HTTPS-ready API responses

## Installation

### 1. Clone repository
```
git clone https://github.com/username/dynamic-form-builder.git
cd dynamic-form-builder
```

### 2. Install dependencies
```
npm install
```

### 3. Add environment variables (.env)
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/dynamic-form
```

### 4. Run backend
```
npm run dev
```

### 5. Run frontend
```
cd client
npm install
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/form-schema/get/schema | Fetch JSON schema |
| POST | /api/form-submissions/post/submission | Submit form |
| GET | /api/get-submissions/get/submissions | Fetch paginated submissions |

## Example Requests & Responses

### 1. GET Form Schema

**Request**
```
GET http://localhost:3000/api/form-schema/get/schema
```

**Response**
```json
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
```

---

### 2. POST Form Submission

**Request**
```
POST http://localhost:3000/api/form-submissions/post/submission
Content-Type: application/json
```

```json
{
  "fullName": "MITHUN",
  "email": "parker.doe@company.com",
  "age": 44,
  "department": "Engineering",
  "skills": ["JavaScript"],
  "joiningDate": "2024-05-10",
  "address": "BLR"
}
```

**Success Response**
```json
{
  "success": true,
  "submissionId": "2da874d3-8a93-4f51-9e1c-69c8b2746e3d",
  "createdAt": "2025-11-30T18:00:41.001Z"
}
```

**Error Response**
```json
{
  "success": false,
  "errors": {
    "skills": "must be string"
  }
}
```

---

### 3. GET Submissions

**Request**
```
GET http://localhost:3000/api/get-submissions/get/submissions?page=1&sortBy=createdAt&sortOrder=desc
```

**Response**
```json
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
```

## Validation Rules

### Text Fields
- minLength  
- maxLength  
- regex  

### Number Fields
- min  
- max  

### Select / Multi-Select
- minSelected  
- maxSelected  

### Date Fields
- minDate  
- maxDate  

### Required Fields
- Must be present and non-empty

## Database Design

**Submissions Collection**
```json
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
```

- `createdAt` is indexed  
- `formData` supports dynamic fields
