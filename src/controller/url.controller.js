import { createShortUrl, deleteUrlById, findUrlByUrlId, getUrlsByUser } from "../model/url.model.js";
import Url from "../model/url.model.js";
import axios from "axios";
import * as cheerio from 'cheerio';


export async function postNewUrl(req, res) {
    const { url } = req.body;
    const userId = req.user.id;

    const slug = await createShortUrl(5);
    let longUrl = url;
    const https = "https://";



    if (!/^https?:\/\//i.test(longUrl)) {
        longUrl = "https://" + longUrl;
    };

    try {
        const response = await axios.get(longUrl);
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $("title").text();
        const newEntry = new Url({
            url: longUrl,
            title: title,
            slug: slug,
            user: userId
        });

        const entry = await newEntry.save();
        res.status(201).send(entry);
    } catch (error) {
        console.error("Error saving entry:", error);
        res.status(500).send(error || 'Error saving entry');
    };
};

export async function getAllUrlsByUser(req, res) {
    const userId = req.user.id;
    try {
        const allEntries = await getUrlsByUser(userId);
        res.status(200).send(allEntries);
    } catch (error) {
        console.error("error: ", error);
    };
};

export async function deleteUrl(req, res) {
    const { urlId } = req.params;
    try {
        await deleteUrlById(urlId);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(404);
    };
};

export async function getUrlById(req, res) {
    const { urlId } = req.params;

    try {
        const entry = await findUrlByUrlId(urlId);
        res.status(200).send({
            title: entry.title,
            url: entry.url,

        });
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    };
};