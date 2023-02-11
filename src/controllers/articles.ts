import { Request, Response } from "express";
import { Article, articleModel } from "../models/articles";
import { badRequest, internalServerError, notFound, ok, validateNumber } from "../services/utils";

const insertArticle = (req: Request, res: Response) => {
    {
        const article = req.body;
        if (!article)
            return badRequest(res, "Artigo inválido!");

        if (!article.url)
            return badRequest(res, 'Informe a url do artigo!');
    }
    
    const article = req.body as Article;
    return articleModel.insertArticle(article)
        .then(aritcles => {
            res.json("Produto adicionado.");
        })
        .catch(err => internalServerError(res, err));
}

const deleteArticle = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const articleSaved = await articleModel.getArticle(id);
        if(!articleSaved)
            return notFound(res);
    }

    return articleModel.deleteArticle(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

const listArticle = ({}: Request, res: Response) => {
    articleModel.listArticle()
        .then(products => {
            res.json(products)
        })
        .catch(err => internalServerError(res, err));
}
export const articleController = {
    insertArticle,
    deleteArticle,
    listArticle,
}