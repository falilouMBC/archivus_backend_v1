import type { Request, Response } from "express";
import * as ficheService from "../services/fiche.service.js";
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
        
        const fiche = await ficheService.createFiche({ 
            title: body.title, 
            content: body.content, 
            userId: new Types.ObjectId(req.user.id), // Utiliser l'ID du token
            resume_ia: body.resume_ia,
            tags: body.tags
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