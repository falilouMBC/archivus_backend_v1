export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
}
export interface LoginDTO {
    email: string;
    password: string;
}
export interface UserResponseDTO {
    id: string;
    username: string;
    email: string;
    createdAt?: Date;
}
export interface AuthResponseDTO {
    message: string;
    user: UserResponseDTO;
    token: string;
}
export interface RegisterParams {
    username: string;
    email: string;
    password: string;
}
export interface LoginParams {
    email: string;
    password: string;
}
//# sourceMappingURL=user.types.d.ts.map