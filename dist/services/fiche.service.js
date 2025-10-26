import Fiche from "../models/Fiche.model.js";
import { Types } from "mongoose";
/**
 * Crée une nouvelle fiche
 * @param data - Données de la fiche à créer
 * @returns La fiche créée
 */
export const createFiche = async (data) => {
    const newFiche = await Fiche.create(data);
    return newFiche;
};
/**
 * Récupère toutes les fiches d'un utilisateur
 * @param userId - ID de l'utilisateur
 * @returns Liste des fiches de l'utilisateur
 */
export const getFicheByUserId = async (userId) => {
    const fiches = await Fiche.find({ userId }).sort({ createdAt: -1 });
    return fiches;
};
/**
 * Récupère une fiche par son ID
 * @param id - ID de la fiche
 * @returns La fiche trouvée ou null
 */
export const getFicheById = async (id) => {
    const fiche = await Fiche.findById(id);
    return fiche;
};
/**
 * Met à jour une fiche
 * @param id - ID de la fiche
 * @param data - Données à mettre à jour
 * @returns La fiche mise à jour ou null
 */
export const updateFiche = async (id, data) => {
    const updatedFiche = await Fiche.findByIdAndUpdate(id, { ...data, updatedAt: new Date() }, { new: true });
    return updatedFiche;
};
/**
 * Supprime une fiche
 * @param id - ID de la fiche à supprimer
 */
export const deleteFiche = async (id) => {
    await Fiche.findByIdAndDelete(id);
};
/**
 * Recherche des fiches par titre
 * @param title - Titre à rechercher (insensible à la casse)
 * @returns Liste des fiches correspondantes
 */
export const getFicheByTitle = async (title) => {
    const fiches = await Fiche.find({
        title: { $regex: title, $options: "i" }
    }).sort({ createdAt: -1 });
    return fiches;
};
//# sourceMappingURL=fiche.service.js.map