import rateLimit from "express-rate-limit";
import helmet from "helmet";
// Protection contre les attaques par force brute
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre
    message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
    standardHeaders: true,
    legacyHeaders: false,
});
// Limite stricte pour les routes d'authentification
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite à 5 tentatives de connexion
    message: "Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.",
    skipSuccessfulRequests: true, // Ne compte pas les requêtes réussies
});
// Configuration de Helmet pour sécuriser les headers HTTP
export const helmetConfig = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"], // Pour Swagger UI
            scriptSrc: ["'self'", "'unsafe-inline'"], // Pour Swagger UI
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
});
//# sourceMappingURL=security.middleware.js.map