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

