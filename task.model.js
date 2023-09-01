const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    emoji: {
      type: String,
      default: "💭",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "ticket", "progress", "complete"],
      default: "ticket",
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", taskSchema);
