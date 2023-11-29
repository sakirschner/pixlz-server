import mongoose from 'mongoose';
import config from './configs/db.congif';

const { hostname, port, database } = config;
const URI = `mongodb://${hostname}:${port}/${database}`;

async function dbConnection() {
  try {
    await mongoose.connect(URI);
    console.info(`Connected to db on ${hostname}:${port}`);
  } catch (error) {
    console.error('MongoDB Connection error', error);
    process.exit();
  }
}

export default dbConnection;
