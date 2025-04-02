import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  USN: { type: String, required: true, unique: true },
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", userSchema);

export default Contact;
