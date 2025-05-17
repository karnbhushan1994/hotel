const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "House", // this should match your house model name
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // this should match your user model name
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    nightStaying: {
      type: Number,
      required: true,
    },
    guestNumber: {
      type: Number,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    taxes: {
      type: Number,
      required: true,
    },
    authorEarnedPrice: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String, // Stripe uses alphanumeric order/paymentIntent IDs
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const reservationDB = mongoose.model("Reservation", reservationSchema);

module.exports = reservationDB;
