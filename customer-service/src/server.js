import dotenv from 'dotenv';
import app from './app.js';

// Select env file based on NODE_ENV
const envFile = 
  process.env.NODE_ENV === 'production' ? './env/.env.prod' :
  process.env.NODE_ENV === 'staging' ? './env/.env.staging' :
  '.env'; // default: dev

dotenv.config({ path: envFile });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});
