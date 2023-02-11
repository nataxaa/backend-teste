import { dbQuery, dbQueryFirst } from "../services/db";
import puppeteer from 'puppeteer';

export type Article = {
    url:string;
}

type aritcle_complete = {
    id:string;
    url: string;
    image: string;
    name: string;
}

const insertArticle = async (article: Article) => {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`${article.url}`);
      
        // Pegar a src da Imagem
        const image =  await page.evaluate(()=>{
        var hotelsElms = document.getElementsByClassName('css-2179a6') ;
          return hotelsElms[0].getAttribute('src')
        })
      
        // Pegar o titulo da imagem
        const classValue = await page.$eval('.css-1k5pqev', el => el.innerHTML);
        let titleValue = classValue;
        
        await browser.close();
      
        await dbQuery(`INSERT INTO Artigo (name, image, url ) VALUES(?, ?, ?)`,
         [titleValue, image , article.url ])
       let retorno = await dbQuery(`SELECT seq AS id FROM sqlite_sequence WHERE  name = 'Artigo'`);
        return getArticle(retorno[0].id);
      })();
      
}
const getArticle = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM Artigo WHERE id = ?`, [id]);
    return retorno as Article ;
}
const deleteArticle = async (id: number) => {
    await dbQueryFirst(`DELETE FROM Artigo WHERE id = ?`, [id]);
}

const listArticle = async () => {
    const retorno = await dbQuery(`SELECT * FROM Artigo`);
    return retorno as aritcle_complete[];
}

export const articleModel = {
    insertArticle,
    getArticle,
    deleteArticle,
    listArticle,
}