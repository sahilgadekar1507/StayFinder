import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 2000,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Apartment",
        "Villa",
        "House",
        "Cabin",
        "Farm House",
        "Hotel",
        "Resort",
        "Beach House",
        "Camping",
      ],
    },

    price: {
      type: Number,
      required: true,
      min: [1, "Price must be greater than 0"],
    },

    currency: {
      type: String,
      enum: ["INR", "USD", "EUR"],
      default: "INR",
    },

    images: [imageSchema],

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
listingSchema.index({ city: 1 });
listingSchema.index({ category: 1 });
listingSchema.index({ owner: 1 });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;