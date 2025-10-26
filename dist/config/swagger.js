import swaggerJsdoc from "swagger-jsdoc";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Archivus API Documentation",
            version: "1.0.0",
            description: "API REST pour l'application Archivus - Système de gestion d'archives",
            contact: {
                name: "Archivus Team",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Serveur de développement",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Entrez votre token JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID de l'utilisateur",
                        },
                        username: {
                            type: "string",
                            description: "Nom d'utilisateur",
                        },
                        email: {
                            type: "string",
                            description: "Email de l'utilisateur",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Date de création",
                        },
                    },
                },
                RegisterRequest: {
                    type: "object",
                    required: ["username", "email", "password"],
                    properties: {
                        username: {
                            type: "string",
                            example: "johndoe",
                        },
                        email: {
                            type: "string",
                            example: "john@example.com",
                        },
                        password: {
                            type: "string",
                            example: "password123",
                            minLength: 8,
                        },
                    },
                },
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "john@example.com",
                        },
                        password: {
                            type: "string",
                            example: "password123",
                        },
                    },
                },
                AuthResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                        },
                        user: {
                            $ref: "#/components/schemas/User",
                        },
                        token: {
                            type: "string",
                            description: "JWT token",
                        },
                    },
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                        },
                    },
                },
                Fiche: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID de la fiche",
                        },
                        title: {
                            type: "string",
                            description: "Titre de la fiche",
                        },
                        content: {
                            type: "string",
                            description: "Contenu de la fiche",
                        },
                        userId: {
                            type: "string",
                            description: "ID de l'utilisateur propriétaire",
                        },
                        resume_ia: {
                            type: "string",
                            description: "Résumé généré par IA",
                        },
                        tags: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            description: "Tags associés",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Date de création",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Date de mise à jour",
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};
export const swaggerSpec = swaggerJsdoc(options);
//# sourceMappingURL=swagger.js.map