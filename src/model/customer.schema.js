import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  cart: {type: [mongoose.Schema.Types.ObjectId], ref: 'Product'}
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer
