import mongoose from "mongoose";
const DOCUMENT_NAME = "OrderItem";
const COLLECTION_NAME = "OrderItems"

const orderItemSchema = new mongoose.Schema(
  {
  quantity: { type: Number, required: true },
  priceAtTime: { type: Number, required: true },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default mongoose.model(DOCUMENT_NAME, orderItemSchema);
