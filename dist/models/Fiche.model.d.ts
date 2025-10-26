import { Types, Document } from "mongoose";
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
declare const Fiche: import("mongoose").Model<IFiche, {}, {}, {}, Document<unknown, {}, IFiche, {}, {}> & IFiche & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default Fiche;
//# sourceMappingURL=Fiche.model.d.ts.map