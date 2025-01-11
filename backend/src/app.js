import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectToDb } from './utils/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

const app = express();
dotenv.config();

const dirname = path.resolve();

// Being able to send JSON format data
app.use(express.json());

// Middleware that allows you to access cookies and their properties through req
app.use(cookieParser());

// Enable CORS for all origins
app.use(cors());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Serving static files from the "public" directory
app.use(express.static(path.join(dirname, 'public')));

// Authentication routes
app.use('/api/auth', authRoutes);

// Message routes
app.use('/api/messages', messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err });
});

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log(`Server is running on port ${process.env.PORT} 🤖⚡`);
});