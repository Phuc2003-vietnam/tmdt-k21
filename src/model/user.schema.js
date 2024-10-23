import mongoose from 'mongoose';
const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    type: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export default mongoose.model(DOCUMENT_NAME, userSchema);
