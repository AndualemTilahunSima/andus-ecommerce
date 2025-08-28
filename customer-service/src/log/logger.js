import '../config/loadEnv.js';
import winston from 'winston';
import path from 'path';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Custom log format
const customFormat = winston.format.printf(({ level, message, timestamp, meta }) => {
  const file = meta?.file || 'unknown_file';
  const userMap = meta?.user || {};
  const username = userMap.username || 'anonymous';
  const userId = userMap.userId || 'unknown';
  return `${timestamp} [${level.toUpperCase()}] [${file}] [User: ${username} | ID: ${userId}] ${message}`;
});

// Base logger
const baseLogger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [new winston.transports.Console()]
});

/**
 * Creates a logger for a specific file
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
    error: (message, logContext = {}) => {
      baseLogger.log({
        level: 'error',
        message,
        meta: { file: currentFile, user: logContext }
      });
    }
  };
};

export default createLogger;
