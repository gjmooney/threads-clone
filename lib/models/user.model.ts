import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  filaments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Filament",
    },
  ],
  onBoarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// Use existing model OR create new model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
