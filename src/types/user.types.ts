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
    user: UserResponseDTO;
    message: string;
    token: string;
}

export interface LoginResponseDTO {
    message: string;
    token: string;
}

