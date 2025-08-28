import './config/loadEnv.js';
import app from './app.js';
import { testConnection } from './config/database.js';
import createLogger from './log/logger.js';

const logger = createLogger(import.meta.url);
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Test database connection
    const isConnected = await testConnection();
    if (!isConnected) {
      logger.error('Database connection failed. Exiting...');
      process.exit(1);
    }

    // Initialize application
    await app.initialize();

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
