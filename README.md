# Bulk Mail Application

## Overview
This is a Bulk Mail web application that allows users to sign up, log in, and send bulk emails to multiple recipients. The application includes an admin dashboard to manage user mail data, view mail statuses, and delete user mail records. The UI is designed to be professional, polished, and consistent with a unique color theme and typography.

## Features
- User Signup and Login with validation
- Bulk mail sending functionality after login or signup
- Admin dashboard displaying user mail attempts grouped by user
- Status indicators for sent and not sent mails
- Delete functionality to remove user mail records from frontend and backend
- Responsive design for desktop and mobile devices
- Professional UI with 3D buttons, hover effects, and consistent color theme
- Animated "Bulk Mail" text on login user page synchronized with video
- Logout buttons on admin dashboard and home page

## Technology Stack
- Frontend: React, Tailwind CSS, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Email Sending: Nodemailer
- Styling: Tailwind CSS with custom color palette and Neue Machina font

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   node server.js
   ```
4. Ensure MongoDB connection string is correctly set in `server.js`.

### Frontend
1. Navigate to the `frontnd` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm run dev
   ```
4. Open the app in your browser at the provided local URL.

## Usage
- Sign up as a new user or log in if you already have an account.
- After login, access the mail sending page to compose and send bulk emails.
- Admin users can log in via the admin login page to access the dashboard.
- The admin dashboard shows all user mail attempts with status and allows deletion.
- Use the logout buttons to securely exit the application.



## Author
Developed by Mushbiqa.
