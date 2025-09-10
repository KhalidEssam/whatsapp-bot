import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    preferredLanguage: { type: String, enum: ['en', 'ar'], default: 'en' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// module.exports = mongoose.model('User', userSchema);

const User = mongoose.model("User", userSchema);

export default User;