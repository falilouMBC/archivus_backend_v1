import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
const User = model("User", userSchema);
export default User;
//# sourceMappingURL=User.model.js.map