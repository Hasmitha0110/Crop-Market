import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, unique: true },
  nic: { type: String, unique: true },
  district: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

export default mongoose.model('User', userSchema);
