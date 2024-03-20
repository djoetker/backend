import jwt from "jsonwebtoken";

export async function requireAuth(req, res, next) {
    const authToken = req.cookies.access_token;
    try {
        const user = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized!" });
    };
};