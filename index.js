import express from "express";
import ogs from "open-graph-scraper"
import { query } from 'express-validator';

const app = express()
const port = 3000
const r = new RegExp('^(?:[a-z]+:)?//', 'i');

app.get('/:url',
    query("url").isURL(),
    async (req, res) => {
        try {
            const options = {
                url: req.params.url,
                ogImageFallback: true,
                allMedia: true,
                // downloadLimit: 10000000,
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
                },
                urlValidatorSettings: {
                    protocols: ['http', 'https'],
                    require_tld: false,
                    require_protocol: false,
                    require_host: false,
                    require_valid_protocol: false,
                    allow_underscores: true,
                    host_whitelist: false,
                    host_blacklist: false,
                    allow_trailing_dot: false,
                    allow_protocol_relative_urls: true,
                    disallow_auth: false,
                }
            };

            let response = await ogs(options);
            if (response.error || !response.result.ogImage) {
                // console.error(response)
                return res.sendStatus(404)
            }

            let imageURLString = Array.isArray(response.result.ogImage) ? response.result.ogImage[0].url : response.result.ogImage.url;
            if (!r.test(imageURLString)) {
                imageURLString = new URL(imageURLString, req.params.url).href
            }

            return res.redirect(imageURLString)
        } catch (e) {
            console.error(e)
            return res.sendStatus(500)
        }
    })

app.use(function (req, res, next) {
    res.sendStatus(405)
})

app.listen(port, () => {
    console.log(`Image Fetch Proxy API listening at http://localhost:${port}`)
})