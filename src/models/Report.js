import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // <-- also string
    answers: { type: Object, required: true },
    reportText: { type: String, required: true },
    language: { type: String, enum: ["en", "ar"], default: "en" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);
