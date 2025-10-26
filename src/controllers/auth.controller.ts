import type { Request, Response } from "express";
import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import type { RegisterDTO, LoginDTO, LoginResponseDTO } from "../types/user.types.js";

export const registerController = async (req: Request, res: Response) => {
    try {
        const body = req.body as RegisterDTO;

        if (!body.username || !body.email || !body.password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await authService.register(body);

        const response: RegisterDTO & { message: string } = {
            message: "User registered successfully",
            username: user.username,
            email: user.email,
        } as RegisterDTO & { message: string };

        res.status(201).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const body = req.body as LoginDTO;

        if (!body.email || !body.password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await authService.login(body.email, body.password);

        const token = jwt.sign(
            { id: user._id, isAdmin: false },
            process.env.JWT_SECRET || "",
            { expiresIn: "15m" }
        );

        const response: LoginResponseDTO = {
            message: "Login successful",
            token,
        };

        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const logoutController = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await authService.logout(req.user.id);

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const getUserController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await authService.getUser(id);

        const response = {
            user: {
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
        };

        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const allUsersController = async (req: Request, res: Response) => {
    try {
        const users = await authService.allUsers();
        
        const response = {
            users: users.map(user => ({
                id: user._id.toString(),
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            })),
        };
        
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

