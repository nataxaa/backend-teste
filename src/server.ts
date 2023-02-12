
/*
import puppeteer from 'puppeteer';


(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://devgo.com.br/trabalhando-com-arrays-em-javascript');

  // Pegar a src da Imagem
  const list =  await page.evaluate(()=>{
  var hotelsElms = document.getElementsByClassName('css-2179a6') ;
    return hotelsElms[0].getAttribute('src')
  })

  // Pegar o titulo da imagem
  const classValue = await page.$eval('.css-1k5pqev', el => el.innerHTML);
  let titleValue = classValue;
  
  

})();
*/

import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import bodyParser from 'body-parser';
import express from 'express'
import { useRoutes } from './routes';


const server = (module.exports = express())
server.use(cors())
server.use(bodyParser.json());
useRoutes(server)




server.listen(3333)


