import dotenv from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'production' ? '../env/.env.prod' :
    process.env.NODE_ENV === 'staging' ? '../env/.env.staging' :
      '../env/.env'; // default: dev

console.log(envFile)
dotenv.config({ path: "../env/.env" });