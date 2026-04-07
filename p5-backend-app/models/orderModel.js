import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foods",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (value) => value.length > 0,
        message: "Order must include at least one item",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Orders = mongoose.model("orders", orderSchema);

export default Orders;
