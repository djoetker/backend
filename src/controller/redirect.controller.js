import { findUrlBySlug } from "../model/url.model.js";

export async function redirectSlug(req, res) {
    const { slug } = req.params;

    try {
        const entry = await findUrlBySlug(slug);

        if (entry) {
            return res.status(307).redirect(process.env.FRONTEND_URL + "redirect/" + entry._id)
        }
    } catch (error) {
        console.error(error);
        res.status(404).send(error);
    };
};

