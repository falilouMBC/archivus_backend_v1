import { Router } from "express";
import { createFicheController, getFicheByUserIdController, getFicheByIdController, updateFicheController, deleteFicheController, getFicheByTitleController } from "../controllers/fiche.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();
/**
 * @swagger
 * /api/fiches:
 *   post:
 *     summary: Créer une nouvelle fiche
 *     tags: [Fiches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: string
 *               resume_ia:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Fiche créée avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/", verifyToken, createFicheController);
/**
 * @swagger
 * /api/fiches/user/{userId}:
 *   get:
 *     summary: Récupérer toutes les fiches d'un utilisateur
 *     tags: [Fiches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des fiches
 *       400:
 *         description: Erreur
 */
router.get("/user/:userId", verifyToken, getFicheByUserIdController);
/**
 * @swagger
 * /api/fiches/{id}:
 *   get:
 *     summary: Récupérer une fiche par son ID
 *     tags: [Fiches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fiche trouvée
 *       404:
 *         description: Fiche non trouvée
 */
router.get("/:id", verifyToken, getFicheByIdController);
/**
 * @swagger
 * /api/fiches/{id}:
 *   put:
 *     summary: Mettre à jour une fiche
 *     tags: [Fiches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               resume_ia:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Fiche mise à jour
 *       404:
 *         description: Fiche non trouvée
 */
router.put("/:id", verifyToken, updateFicheController);
/**
 * @swagger
 * /api/fiches/{id}:
 *   delete:
 *     summary: Supprimer une fiche
 *     tags: [Fiches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fiche supprimée
 *       404:
 *         description: Fiche non trouvée
 */
router.delete("/:id", verifyToken, deleteFicheController);
/**
 * @swagger
 * /api/fiches/search/{title}:
 *   get:
 *     summary: Rechercher des fiches par titre
 *     tags: [Fiches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fiches trouvées
 */
router.get("/search/:title", verifyToken, getFicheByTitleController);
export default router;
//# sourceMappingURL=fiche.routes.js.map