import type { IUser } from "../models/User.model.js";
/**
 * Inscrit un nouvel utilisateur
 * @param params - Paramètres d'inscription (username, email, password)
 * @returns L'utilisateur créé
 */
export declare const register: (username: string, email: string, password: string) => Promise<IUser>;
/**
 * Connecte un utilisateur
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 * @returns L'utilisateur authentifié
 */
export declare const login: (email: string, password: string) => Promise<IUser>;
/**
 * Déconnecte un utilisateur
 * @param userId - ID de l'utilisateur
 */
export declare const logout: (userId: string) => Promise<void>;
/**
 * Récupère un utilisateur par son ID
 * @param userId - ID de l'utilisateur
 * @returns L'utilisateur trouvé
 */
export declare const getUser: (userId: string) => Promise<IUser>;
/**
 * Récupère tous les utilisateurs
 * @returns Liste de tous les utilisateurs
 */
export declare const allUsers: () => Promise<IUser[]>;
//# sourceMappingURL=auth.service.d.ts.map