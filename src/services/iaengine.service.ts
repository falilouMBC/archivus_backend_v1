import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuration globale de l'API
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ Erreur: GEMINI_API_KEY n'est pas définie dans les variables d'environnement.");
    console.log("💡 Créez un fichier .env avec: GEMINI_API_KEY=your_api_key_here");
}

/**
 * Génère un résumé du contenu d'une fiche
 * @param content - Contenu de la fiche à résumer
 * @returns Résumé généré par l'IA
 */
export const generateSummary = async (content: string): Promise<string> => {
    try {
        if (!API_KEY) {
            throw new Error("Clé API Gemini non configurée");
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Fais un résumé concis (environ 3 phrases) du texte suivant en français: ${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        return summary.trim();
    } catch (error) {
        console.error("Erreur lors de la génération du résumé:", error);
        throw new Error("Impossible de générer le résumé");
    }
};

/**
 * Génère des tags automatiques basés sur le contenu
 * @param content - Contenu de la fiche
 * @returns Liste de tags générés
 */
export const generateTags = async (content: string): Promise<string[]> => {
    try {
        if (!API_KEY) {
            throw new Error("Clé API Gemini non configurée");
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Génère une liste de tags pertinents (mots-clés, max 5) pour le texte suivant, séparés par des virgules: ${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const tagsText = response.text();

        // Parse les tags et les nettoie
        const tags = tagsText
            .split(',')
            .map((tag: string) => tag.trim().toLowerCase())
            .filter((tag: string) => tag.length > 0);

        return tags;
    } catch (error) {
        console.error("Erreur lors de la génération des tags:", error);
        throw new Error("Impossible de générer les tags");
    }
};

/**
 * Génère un résumé et des tags pour une fiche
 * @param content - Contenu de la fiche
 * @returns Objet contenant le résumé et les tags
 */
export const processContent = async (content: string): Promise<{
    summary: string;
    tags: string[];
}> => {
    try {
        const [summary, tags] = await Promise.all([
            generateSummary(content),
            generateTags(content)
        ]);

        return { summary, tags };
    } catch (error) {
        console.error("Erreur lors du traitement du contenu:", error);
        throw new Error("Impossible de traiter le contenu avec l'IA");
    }
};
