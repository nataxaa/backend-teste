import { Application } from "express";
import Router from 'express';
import { articleRouter } from "./articles";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/Articles', articleRouter);

    app.use('/api/v1', apiRouter);
}