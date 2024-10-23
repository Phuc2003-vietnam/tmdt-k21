import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Payment';
const COLLECTION_NAME = 'Payments';

const paymentSchema = new mongoose.Schema(
  {
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Bank Transfer', 'E-Wallet'],
      required: true,
    },
    amount: { type: Number, required: true },
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export default mongoose.model(DOCUMENT_NAME, paymentSchema);
