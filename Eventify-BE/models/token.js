import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiryToken: {
      type: String,
    },
  },
  { timestamps: true }
);
const Token = mongoose.model("Token", TokenSchema);
export default Token;
