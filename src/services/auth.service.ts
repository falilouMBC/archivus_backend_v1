import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { IUser } from "../models/User.model.js";
import User from "../models/User.model.js";
import type { RegisterDTO } from "../types/user.types.js";


/**
 * Inscrit un nouvel utilisateur
 * @param params - Paramètres d'inscription (username, email, password)
 * @returns L'utilisateur créé
 */
export const register = async (params: RegisterDTO): Promise<IUser> => {
    const { username, email, password } = params;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new Error("User with this email or username already exists");
    }
    
    const user = await User.create({ username, email, password });
    return user;
};

/**
 * Connecte un utilisateur
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 * @returns L'utilisateur authentifié
 */
export const login = async (email: string, password: string): Promise<IUser> => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }
    
    return user;
};

/**
 * Déconnecte un utilisateur
 * @param userId - ID de l'utilisateur
 */
export const logout = async (userId: string): Promise<void> => {
    await User.findByIdAndUpdate(userId, { token: null });
};

/**
 * Récupère un utilisateur par son ID
 * @param userId - ID de l'utilisateur
 * @returns L'utilisateur trouvé
 */
export const getUser = async (userId: string): Promise<IUser> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

/**
 * Récupère tous les utilisateurs
 * @returns Liste de tous les utilisateurs
 */
export const allUsers = async (): Promise<IUser[]> => {
    const users = await User.find().select("-password");
    return users;
};
