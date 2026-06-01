import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  birthDate?: string;
  gender?: string;
  favoriteLanguages?: string[];
  biography?: string;
  comment?: string;
  login: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    birthDate: { type: String, required: false },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },
    favoriteLanguages: { type: [String], default: [] },
    biography: { type: String, required: false },
    comment: { type: String, required: false },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Создаем индексы для уникальности
UserSchema.index({ phone: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ login: 1 }, { unique: true });

// Хеширование пароля перед сохранением
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Метод сравнения паролей
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
