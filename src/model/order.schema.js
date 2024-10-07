import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  status: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default  Order;
