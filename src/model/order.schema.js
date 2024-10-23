import mongoose from 'mongoose';
const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

const orderSchema = new mongoose.Schema(
  {
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export default mongoose.model(DOCUMENT_NAME, orderSchema);
