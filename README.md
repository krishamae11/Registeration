# Student Enrollment & Scheduling System (Spring Boot)

A backend system designed to handle the student lifecycle from admission to official enrollment, including schedule (COE) management.

# Overview
  -This system automates the process of enrolling students and managing their academic schedules.It uses Spring Data JPA to interact
   with a MySQL/PostgreSQL database to track admissions, official enrollment records, and course schedules.

# Project Structure

# Models(Entity)

- admission.java: Stores initial applicant data including department, program, and academic year.
- enrolled_student.java: Represents officially enrolled students with a `date_enrolled` timestamp.
- coe.java and User.java: Maps to the `student_schedule` table to manage subject codes, instructors, and units.
- coe_upper.java: A specialized model for upper-level students with validation tracking.

# Controllers
- admission_controller: Handles lookups for applicant data.
- enrollment_controller: The core logic that "promotes" an applicant to an enrolled student by copying data between tables.
- coe_controller and test_controller: Provides endpoints to fetch student schedules.

# API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admission/{id}` | Fetch details of an applicant by ID. |
| `POST` | `/api/enroll/{id}` | Officially enroll a student (moves data from admission to enrolled table). |
| `GET` | `/api/coe` | Retrieve all subject schedules (COE). |
| `GET` | `/api/schedule` | Alternative endpoint for scheduling data. |

# How Enrollment Works
When a student is enrolled via the `POST /api/enroll/{id}` endpoint:
1. The system finds the student in the *admission records.
2. It creates a new record in the *Enrolled Student table.
3. It copies all relevant info (Name, Program, Section, etc.) and adds a real-time timestamp for the enrollment date.

# What we Used
- Framework: For Spring Boot
- Database: Spring Data JPA and Hibernate
- Build Tool: Maven
- Language: Java(for backend)
