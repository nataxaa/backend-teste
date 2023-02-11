import { Router } from 'express';
import { articleController } from '../controllers/articles';

const articleRouter = Router();

articleRouter.post('/', articleController.insertArticle);
articleRouter.delete('/:id', articleController.deleteArticle);
articleRouter.get('/', articleController.listArticle)

export { 
    articleRouter,
}