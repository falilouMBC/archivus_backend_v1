import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Archivus API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
            schemas: {
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
                            format: "email",
                            example: "john@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
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
                            format: "email",
                            example: "john@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "password123",
                        },
                    },
                },
                UserResponse: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                        },
                        username: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                            format: "email",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
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
                            $ref: "#/components/schemas/UserResponse",
                        },
                        token: {
                            type: "string",
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
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);