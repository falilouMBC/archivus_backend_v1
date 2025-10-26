import type { Types } from "mongoose";

export interface CreateFicheDTO {
    title: string;
    content: string;
    userId?: string; // Optionnel car récupéré du token
    resume_ia?: string;
    tags?: string[];
}

export interface UpdateFicheDTO {
    title?: string;
    content?: string;
    resume_ia?: string;
    tags?: string[];
}

export interface FicheServiceData {
    title: string;
    content: string;
    userId: Types.ObjectId;
    resume_ia?: string | undefined;
    tags?: string[] | undefined;
}

