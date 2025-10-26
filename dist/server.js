import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import ficheRoutes from "./routes/fiche.routes.js";
import { swaggerSpec } from "./config/swagger.js";
// import { limiter, authLimiter, helmetConfig } from "./middlewares/security.middleware.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middlewares de sécurité
// TODO: Installer 'npm install helmet express-rate-limit' puis décommenter
// app.use(helmetConfig); // Protection des headers HTTP
// app.use(limiter); // Rate limiting global
// Middlewares de base
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Limite la taille des requêtes
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// Swagger Documentation
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//     customCss: ".swagger-ui .topbar { display: none }",
//     customSiteTitle: "Archivus API Documentation",
// })); // Temporairement désactivé pour debug
// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Archivus API",
        documentation: `http://localhost:${PORT}/api-docs`,
    });
});
app.use("/api/auth", authRoutes);
app.use("/api/fiches", ficheRoutes);
// Connexion à la base de données
connectDB();
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
export default app;
//# sourceMappingURL=server.js.map