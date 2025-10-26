import type { Request, Response } from "express";
import * as ficheService from "../services/fiche.service.js";
import * as iaService from "../services/iaengine.service.js";
import { Types } from "mongoose";
import type { CreateFicheDTO, UpdateFicheDTO } from "../types/fiche.types.js";

export const createFicheController = async (req: Request, res: Response) => {
    try {
        const body = req.body as CreateFicheDTO;
        
        // Vérifier que l'utilisateur est authentifié
        if (!req.user?.id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        
        if (!body.title || !body.content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        
        // Génération automatique du résumé et des tags avec l'IA
        let resume_ia = body.resume_ia;
        let tags = body.tags;
        
        try {
            const aiResult = await iaService.processContent(body.content);
            resume_ia = aiResult.summary;
            tags = aiResult.tags;
        } catch (aiError) {
            console.warn("Erreur IA (continuation sans IA):", aiError);
            // Continue sans IA si l'API n'est pas disponible
        }
        
        const fiche = await ficheService.createFiche({ 
            title: body.title, 
            content: body.content, 
            userId: new Types.ObjectId(req.user.id), // Utiliser l'ID du token
            resume_ia,
            tags
        });
        res.status(201).json({ fiche });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const getFicheByUserIdController = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const fiche = await ficheService.getFicheByUserId(new Types.ObjectId(userId));
        res.status(200).json({ fiche });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const getFicheByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const fiche = await ficheService.getFicheById(new Types.ObjectId(id));
        res.status(200).json({ fiche });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const updateFicheController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body as UpdateFicheDTO;
        
        const fiche = await ficheService.updateFiche(new Types.ObjectId(id), body);
        res.status(200).json({ fiche });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const deleteFicheController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await ficheService.deleteFiche(new Types.ObjectId(id));
        res.status(200).json({ message: "Fiche deleted successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const getFicheByTitleController = async (req: Request, res: Response) => {
    try {
        const { title } = req.params;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const fiche = await ficheService.getFicheByTitle(title);
        res.status(200).json({ fiche });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const regenerateSummaryController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "Fiche ID is required" });
        }
        
        // Récupérer la fiche existante
        const existingFiche = await ficheService.getFicheById(new Types.ObjectId(id));
        if (!existingFiche) {
            return res.status(404).json({ message: "Fiche not found" });
        }
        
        // Générer nouveau résumé et tags
        const aiResult = await iaService.processContent(existingFiche.content);
        
        // Mettre à jour la fiche
        const updatedFiche = await ficheService.updateFiche(
            new Types.ObjectId(id),
            {
                resume_ia: aiResult.summary,
                tags: aiResult.tags
            }
        );
        
        res.status(200).json({ 
            message: "Résumé régénéré avec succès",
            fiche: updatedFiche 
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};