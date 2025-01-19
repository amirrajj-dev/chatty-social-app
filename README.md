# 💬 **Chatty - Real-Time Chat Application**

**Chatty** is a modern, responsive, and feature-rich chat application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO** for real-time messaging. It supports user authentication, file uploads, and is styled using **DaisyUI** with 32 themes. 

---

## 📑 Table of Contents

1. [📖 Project Overview](#-project-overview)
2. [⚙️ Features](#-features)
3. [💻 Tech Stack](#-tech-stack)
4. [🚀 Getting Started](#-getting-started)
5. [📡 Socket.IO Real-time Messaging](#-socketio-real-time-messaging)
6. [📄 Routes Overview](#-routes-overview)
7. [🗂️ File Uploads](#-file-uploads)

---

## 📖 Project Overview

**Chatty** is a full-stack real-time messaging application built to facilitate seamless communication between users. The app includes features such as user authentication, message sending, profile management, and real-time updates, powered by **Socket.IO**. It's fully responsive and offers a beautiful UI with support for **32 DaisyUI themes**.

---

## ⚙️ Features

- **User Authentication**: Sign-up, Sign-in, Sign-out, and token refresh functionality.
- **Profile Management**: Update profile picture and view user details.
- **Real-time Messaging**: Send and receive messages instantly with **Socket.IO**.
- **File Uploads**: Supports profile picture and message image uploads using **Multer**.
- **Responsive UI**: A modern design that's mobile-friendly and responsive.
- **DaisyUI Themes**: Switch between 32 built-in themes for a personalised experience.
- **Real-time User Tracking**: Shows online users with Socket.IO events.

---

## 💻 Tech Stack

### 🖥️ Frontend

- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React**: A JavaScript library for building user interfaces.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) **Vite**: A fast build tool for modern web projects.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- ![Daisy UI](https://img.shields.io/badge/Daisy%20UI-FF69B4?style=flat&logo=daisyui&logoColor=white) **Daisy UI**: A Tailwind CSS component library.

### 🛠️ Backend

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) **Express**: A minimal and flexible web framework for Node.js.
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) **MongoDB**: A NoSQL database used for storing messages and user data.
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongodb&logoColor=white) **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.

### 🔐 Authentication

- ![bcryptjs](https://img.shields.io/badge/bcryptjs-blue?style=flat&logo=key&logoColor=white) **bcryptjs**: A library to hash passwords securely.
- ![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=json-web-tokens&logoColor=white) **JWT**: For secure authentication tokens.

### 🛠️ Development Tools

- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) **TypeScript**: A superset of JavaScript that adds static types.
- ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white) **ESLint**: A tool for identifying and reporting on patterns in JavaScript code.
- ![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=postcss&logoColor=white) **PostCSS**: A tool to transform CSS with JavaScript plugins.

---

## 🚀 Getting Started

Before getting started, ensure you have the following tools:

- **Node.js** 🔰
- **MongoDB** 🍏 (Locally or using MongoDB Atlas)
- **MongoDB Compass** (optional, for better experience)

### 1. 📋 Clone the repository

```bash
git clone https://github.com/amirrajj-dev/chatty-social-app.git
cd chatty
```

### 2. 🛠️ Set up the Backend

In the backend directory, install the dependencies:

```bash
cd backend
npm install
```

Create a .env file in the backend folder and add the following environment variables:

```bash
MONGODB_URI=mongodb://localhost:27017/chatty
PORT=5000
SECRET_KEY=your_secret_key
NODE_ENV=development
```

### 3. 📦 Install Dependencies for Frontend

Go to the frontend directory and install the dependencies:

```bash
cd frontend
npm install
```

### 4. 🚀 Start the Backend Server

Start the backend server:

```bash
cd backend
npm run dev
```

### 5. 🚀 Start the Frontend Server

Start the frontend server:

```bash
cd frontend
npm run dev
```

The frontend will run on http://localhost:5173.

## 📡 Socket.IO Real-time Messaging

The **Chatty** app features real-time messaging using **Socket.IO** to provide seamless communication between users. The Socket.IO setup allows users to exchange messages, get online status updates, and receive notifications instantly.

### Key Features:

- **Live Chat:**: Messages are instantly visible for both the sender and receiver.
- **Online User Tracking**: The app keeps track of users who are currently online. When a user connects or disconnects, all connected clients are updated with the list of online users.
- **Disconnection Handling**: The app detects when users disconnect and updates the online list.

## 📄 Routes Overview

### Authentication Routes

- **POST `/api/auth/signup`**: Register a new user.
- **POST `/api/auth/login`**: Log in an existing user.
- **POST `/api/auth/logout`**: Log out the user.
- **POST `/api/auth/update-profile`**: Update the user's profile picture.
- **GET `/api/auth/check-auth`**: Check the current user's authentication status.

### Message Routes

- **GET `/api/messages/users`**: Get the list of users for the sidebar.
- **GET `/api/messages/:id/messages`**: Retrieve messages with a specific user.
- **POST `/api/messages/send-message/:id`**: Send a message (supports image uploads).

---

## 🗂️ File Uploads

The backend uses **Multer** to handle file uploads:

- **Profile Pictures**: Stored in the `public/profiles` directory.
- **Message Images**: Stored in the `public/messages` directory.
- **Other Files**: Stored in the `public/others` directory.

## 🏁 The End

Hope You Like It My Firend 😉❤️
