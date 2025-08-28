import '../config/loadEnv.js';
import winston from 'winston';
import path from 'path';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Custom log format for development
const developmentFormat = winston.format.printf(({ level, message, timestamp, meta }) => {
  const file = meta?.file || 'unknown_file';
  const userMap = meta?.user || {};
  const username = userMap.username || 'anonymous';
  const userId = userMap.userId || 'unknown';
  const requestId = userMap.requestId || 'no-request-id';
  
  return `${timestamp} [${level.toUpperCase()}] [${file}] [User: ${username} | ID: ${userId} | Request: ${requestId}] ${message}`;
});

// JSON format for production
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Development format
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  developmentFormat
);

// Base logger configuration
const baseLogger = winston.createLogger({
  level: LOG_LEVEL,
  format: NODE_ENV === 'production' ? productionFormat : devFormat,
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true
    })
  ],
  exitOnError: false
});

/**
 * Creates a logger for a specific file/module
 * @param {string} filePath - The file path (import.meta.url)
 * @returns {Object} Logger instance with info, warn, error, debug methods
 */
const createLogger = (filePath) => {
  const currentFile = path.basename(filePath);

  return {
    info: (message, logContext = {}) => {
      baseLogger.log({
        level: 'info',
        message,
        meta: { file: currentFile, user: logContext }
      });
    },
    
    warn: (message, logContext = {}) => {
      baseLogger.log({
        level: 'warn',
        message,
        meta: { file: currentFile, user: logContext }
      });
    },
    
    error: (message, logContext = {}) => {
      baseLogger.log({
        level: 'error',
        message,
        meta: { file: currentFile, user: logContext }
      });
    },
    
    debug: (message, logContext = {}) => {
      baseLogger.log({
        level: 'debug',
        message,
        meta: { file: currentFile, user: logContext }
      });
    },

    // Method to log with additional context
    logWithContext: (level, message, logContext = {}) => {
      baseLogger.log({
        level,
        message,
        meta: { file: currentFile, user: logContext }
      });
    }
  };
};

export default createLogger;
