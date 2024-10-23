import {} from 'dotenv/config';
import mongoose from 'mongoose';
async function connect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_DB);
    /* eslint-disable-next-line no-console */
    console.log('mongoDB connect successfuly');
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log('connect failure');
  }
}

export default { connect };
