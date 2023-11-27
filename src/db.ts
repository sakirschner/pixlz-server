import mongoose from 'mongoose';
import config from './configs/db.congif';

const { hostname, port, database } = config;
const URI = `mongodb://${hostname}:${port}/${database}`;

async function db() {
  try {
    await mongoose.connect(URI);
    console.info(`Successfully connected to MongoDB on ${hostname}:${port}`);
  } catch (error) {
    console.error('MongoDB Connection error', error);
    process.exit();
  }
}

export default db;
