import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true },
  USN: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;
