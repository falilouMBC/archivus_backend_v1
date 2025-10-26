import type { Request, Response } from "express";
export declare const createFicheController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getFicheByUserIdController: (req: Request, res: Response) => Promise<void>;
export declare const getFicheByIdController: (req: Request, res: Response) => Promise<void>;
export declare const updateFicheController: (req: Request, res: Response) => Promise<void>;
export declare const deleteFicheController: (req: Request, res: Response) => Promise<void>;
export declare const getFicheByTitleController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=fiche.controller.d.ts.map