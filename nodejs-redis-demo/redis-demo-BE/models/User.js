import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  hobby: String,
});

export default mongoose.model("User", UserSchema);
