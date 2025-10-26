export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}
declare const User: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=User.model.d.ts.map