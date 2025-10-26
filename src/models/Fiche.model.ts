import { Schema, model, Types, Document } from "mongoose";
import type { IUser } from "./User.model.js";

export interface IFiche extends Document {
    _id: string;
    title: string;
    content: string;
    userId: Types.ObjectId;
    resume_ia?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ficheSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    resume_ia: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Fiche = model<IFiche>("Fiche", ficheSchema);

export default Fiche;