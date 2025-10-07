import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || "3005";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/DBPractice";
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
const formSchema = new mongoose.Schema({
    name: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    comment: { type: String, require: true },
});
const Form = mongoose.model("Form", formSchema);
app.post("/api/form/send", async (req, res) => {
    const { name, phone, email, comment } = req.body;
    try {
        const formData = new Form({
            name,
            phone,
            email,
            comment,
        });
        console.log(formData);
        await formData.save();
        res
            .status(200)
            .send({ message: "Данные были успешно отправленны", formData });
    }
    catch (err) {
        res.status(400).send("Адрес электронной почты уже занят!");
    }
});
app.get("/api/form/get", async (req, res) => {
    try {
        const FORMS = await Form.find();
        console.log(FORMS);
        res.send(FORMS).status(200);
    }
    catch (err) {
        res.status(400);
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map