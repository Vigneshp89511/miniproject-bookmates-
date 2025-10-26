import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    // --- Basic Info ---
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "fiction",
        "non-fiction",
        "mystery",
        "romance",
        "sci-fi",
        "fantasy",
        "biography",
        "history",
        "self-help",
        "engineering",
        "programming",
        "mechanical",
        "electrical",
        "civil",
        "mathematics",
        "ai-ml",
        "data-science",
      ],
    },

    // --- Image (Base64 or URL) ---
    coverImage: {
      type: String, // store Base64 string or URL
      required: false,
    },

    // --- Condition ---
    condition: {
      type: String,
      enum: ["like-new", "very-good", "good", "acceptable"],
      required: true,
    },

    // --- Exchange Type ---
    exchangeType: {
      type: String,
      enum: ["exchange", "donate", "sell"],
      required: true,
    },

    // --- Exchange-specific Fields ---
    exchangeDuration: {
      type: Number, // in days (15, 30, 60)
      required: function () {
        return this.exchangeType === "exchange";
      },
    },
    price: {
      type: Number,
      required: function () {
        return this.exchangeType === "sell";
      },
    },

    // --- Description ---
    description: {
      type: String,
      trim: true,
    },

    // --- Ownership / Status ---
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },

    // --- Agreement ---
    termsAccepted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const UpBooks = mongoose.model("upBook", bookSchema);

export default UpBooks;