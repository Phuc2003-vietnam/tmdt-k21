import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
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
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default  OrderItem;
