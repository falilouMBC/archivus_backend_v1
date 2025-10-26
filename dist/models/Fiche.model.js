import { Schema, model, Types, Document } from "mongoose";
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
const Fiche = model("Fiche", ficheSchema);
export default Fiche;
//# sourceMappingURL=Fiche.model.js.map