import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { initDB } from './src/core/db.js';
import { errorHandler, notFound } from './src/core/middleware.js';

import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import itemRoutes from './src/routes/itemRoutes.js';

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes: everything else requires login
import { authMiddleware } from './src/core/middleware.js';
app.use(authMiddleware);

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Health check (optional, could also be protected)
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
