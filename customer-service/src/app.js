import express from 'express';
import CustomerRoutes from './customer/routes/CustomerRoutes.js';
import logContextMiddleware from './log/logContextMiddleware.js';
import { errorHandler } from './customer/handler/CustomerErrorHandler.js';
import createLogger from './log/logger.js';

const logger = createLogger(import.meta.url);

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(logContextMiddleware);

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, req.logContext);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'customer-service',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/customer', new CustomerRoutes().getRouter());

// 404 handler
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.path}`, req.logContext);
  res.status(404).json({ 
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Centralized error handler
app.use(errorHandler);

export default app;
