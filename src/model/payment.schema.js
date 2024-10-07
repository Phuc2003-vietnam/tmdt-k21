import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Bank Transfer", "E-Wallet"],
    required: true,
  },
  amount: { type: Number, required: true },
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default  Payment;
