🚀 Project Overview
What's App is a modern, real-time messaging application inspired by WhatsApp, built with the MERN stack (MongoDB, Express.js, React, Node.js). The app provides seamless user authentication, real-time chat functionality with online/offline status tracking, profile management, and a responsive UI.

✨ Key Features
User Authentication: Sign up, login, logout with JWT & cookies

Real-Time Messaging: Instant messaging using Socket.io

Online Status: Live user presence detection

User Management: View all registered users (excluding yourself)

Profile Management: Update profile picture via Cloudinary

Responsive UI: Built with Tailwind CSS & DaisyUI

State Management: Global state handled via Zustand

Protected Routes: Middleware for secure endpoints

🗂️ Project Structure
Backend (/backend)
src/app.js – Main server entry point

src/db/db.connection.js – MongoDB connection

src/models/ – Mongoose schemas for User & Message

src/controllers/ – Business logic for auth & messages

src/routes/ – API endpoints for auth & messages

src/middleware/ – Authentication middleware

src/lib/ – Cloudinary & Socket.io configuration

src/Services/ – User service functions

Frontend (/frontend)
src/App.jsx – Main app component with routing

src/pages/ – All major pages (Home, SignIn, SignUp, Profile, Settings, etc.)

src/Components/ – Reusable UI components

src/store/ – Zustand stores for auth & messages

src/lib/axios.js – Axios instance with base URL

src/assets/ – Static assets (icons, images)

public/ – Default profile picture & favicon

🛠️ Tech Stack
Backend
Node.js – Runtime environment

Express.js – Web framework

MongoDB + Mongoose – Database & ODM

Socket.io – Real-time communication

JWT – Authentication

Bcrypt – Password hashing

Cloudinary – Image uploads

Express Validator – Request validation

Frontend
React – UI library

Vite – Build tool

Tailwind CSS + DaisyUI – Styling

Zustand – State management

Axios – HTTP client

Socket.io Client – Real-time updates

React Router DOM – Navigation

React Hot Toast – Notifications

Lucide React – Icons

🔧 Setup & Installation
Prerequisites
Node.js (v18 or higher)

MongoDB (local or cloud)

Cloudinary account (for image uploads)

Backend Setup
Navigate to /backend

Install dependencies:

bash
npm install
Create a .env file with:

env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUD_KEY=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_api_secret
Start the server:

bash
npm run dev
Frontend Setup
Navigate to /frontend

Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
📡 API Endpoints
Authentication (/api/auth)
POST /signup – Register new user

POST /login – Login user

POST /logout – Logout user

GET /check – Check authentication status

PUT /update_profile – Update user profile

Messages (/api/messages)
GET /users – Get all users (except current)

GET /:id – Get messages between current user & target user

POST /:id – Send message to a user

🌐 Socket.io Events
Server → Client
getOnlineUsers – Emits list of online user IDs

Client → Server
Automatically connects with userId in query

Handles disconnection and updates online status

🎨 UI/UX Highlights
Components
Sidebar – Navigation with tooltips

Chat – User list with online indicators

ChatHeader – Selected user info & menu

NoSelectedUserPage – Welcome screen

SearchBar – Filter chats

Navbar – App header with dropdown

Pages
Home – Main chat interface

SignIn/SignUp – Authentication forms

Profile – User profile management

Settings – App settings

Privacy Policy – Legal information

🔒 Security Features
Password hashing with bcrypt

JWT tokens stored in HTTP-only cookies

Protected routes with middleware

Input validation using express-validator

🚦 State Management
Auth Store (useauthstore.js)
Manages user authentication state

Handles login, signup, logout

Manages socket connections

Message Store (messageauthstore.js)
Manages chat users & messages

Handles message fetching & user selection

📱 Responsive Design
Mobile-friendly layout

Dark theme by default

Adaptive components for different screen sizes

🧪 Testing & Quality
ESLint for code linting

Environment variable validation

Error handling with try-catch blocks

🔄 Real-Time Updates
Instant message delivery

Live online/offline status

Automatic reconnection on disconnect

📝 Environment Variables
Backend
env
PORT=4000
MONGO_URI=mongodb://localhost:27017/whatsapp
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUD_KEY=your_api_key
CLOUD_SECRET=your_api_secret
Frontend
Configured via Axios instance to connect to http://localhost:4000/api

🐛 Known Issues & Todos
Implement message persistence in store

Add image upload in chat

Implement message search

Add typing indicators

Implement read receipts

Add group chat functionality

Implement voice/video calls

📄 License
This project is for educational purposes. Feel free to modify and use as needed.

👨‍💻 Author
Yahya Ali – Full-Stack Developer

GitHub: YahyaDilshad

🙏 Acknowledgments
Inspired by WhatsApp's UI/UX

Built with modern web technologies

Special thanks to the open-source community
