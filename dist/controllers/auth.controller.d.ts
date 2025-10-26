import type { Request, Response } from "express";
export declare const registerController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logoutController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const allUsersController: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map