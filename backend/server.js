import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { initDB } from './src/core/db.js';
import { errorHandler, notFound, authMiddleware } from './src/core/middleware.js';

import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import itemRoutes from './src/routes/itemRoutes.js';
import marketRoutes from './src/routes/marketRoutes.js'; // <-- new import
import notificationRoutes from './src/routes/notificationRoutes.js';


const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes: everything else requires login
app.use(authMiddleware);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/marketplace', marketRoutes); 
app.use('/api/notifications', notificationRoutes);


// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV || 'development',
    uptime: process.uptime()
  });
});

// 404 handler
app.use(notFound);

// Central error handler
app.use(errorHandler);

// Async function to initialize DB and start server
async function startServer() {
  const PORT = process.env.PORT || 4000;
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to initialize DB connection', err);
    process.exit(1);
  }
}

startServer();
