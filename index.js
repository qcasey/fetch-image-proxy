import express from "express";
import ogs from "open-graph-scraper"
import { query } from 'express-validator';

const app = express()
const port = 3000

app.get('/:url',
    query("url").isURL(),
    async (req, res) => {
        try {
            const options = { url: req.params.url };
            let response = await ogs(options);
            if (response.error || !response.result.ogImage) {
                console.error(response)
                return res.sendStatus(404)
            }
            
            return res.redirect(!Array.isArray(response.result.ogImage) ? response.result.ogImage.url : response.result.ogImage[0].url)
        } catch (e) {
            console.error(e)
            return res.sendStatus(500)
        }
    })

app.listen(port, () => {
    console.log(`Image Fetch Proxy API listening at http://localhost:${port}`)
})