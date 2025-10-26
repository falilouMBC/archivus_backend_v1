import type { IFiche } from "../models/Fiche.model.js";
import { Types } from "mongoose";
import type { FicheServiceData, UpdateFicheDTO } from "../types/fiche.types.js";
/**
 * Crée une nouvelle fiche
 * @param data - Données de la fiche à créer
 * @returns La fiche créée
 */
export declare const createFiche: (data: FicheServiceData) => Promise<IFiche>;
/**
 * Récupère toutes les fiches d'un utilisateur
 * @param userId - ID de l'utilisateur
 * @returns Liste des fiches de l'utilisateur
 */
export declare const getFicheByUserId: (userId: Types.ObjectId) => Promise<IFiche[]>;
/**
 * Récupère une fiche par son ID
 * @param id - ID de la fiche
 * @returns La fiche trouvée ou null
 */
export declare const getFicheById: (id: Types.ObjectId) => Promise<IFiche | null>;
/**
 * Met à jour une fiche
 * @param id - ID de la fiche
 * @param data - Données à mettre à jour
 * @returns La fiche mise à jour ou null
 */
export declare const updateFiche: (id: Types.ObjectId, data: UpdateFicheDTO) => Promise<IFiche | null>;
/**
 * Supprime une fiche
 * @param id - ID de la fiche à supprimer
 */
export declare const deleteFiche: (id: Types.ObjectId) => Promise<void>;
/**
 * Recherche des fiches par titre
 * @param title - Titre à rechercher (insensible à la casse)
 * @returns Liste des fiches correspondantes
 */
export declare const getFicheByTitle: (title: string) => Promise<IFiche[]>;
//# sourceMappingURL=fiche.service.d.ts.map