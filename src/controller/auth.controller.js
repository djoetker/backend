import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User, { findUserByMail } from "../model/user.model.js";

export async function registerNewUser(req, res) {
    const { email, password } = req.body;

    const pwHash = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: pwHash
    });

    try {
        const entry = await newUser.save();

        const tokenPayload = {
            id: entry._id,
            email: entry.email
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        });

        res.status(201).send({ auth: true });

    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            res.status(409).send({
                error: `Email ${req.body.email} already exists!`
            });
            return;
        };

        res.status(400).send({
            error: error.message
        });
    };
};

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const userEntry = await findUserByMail(email);
        if (!userEntry) {
            res.status(401).send({
                message: "Incorrect username or password!"
            });
            return;
        }

        if (!(await bcrypt.compare(password, userEntry.password))) {
            res.status(401).send({
                message: "Incorrect username or password!"
            });
            return;
        };

        const tokenPayload = {
            id: userEntry._id,
            email: userEntry.email
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 1000 * 60 * 60
        });

        res.status(200).send({
            id: userEntry._id,
            email: userEntry.email,
            auth: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ auth: false });
    };
};

export async function validateToken(req, res) {
    try {
        const authToken = req.cookies.access_token;
        if (!authToken) {
            res.status(401).json({ error: "Unauthorized!", auth: false });
            return;
        };

        const user = jwt.verify(authToken, process.env.JWT_SECRET);

        res.status(200).json({
            message: "Authorized",
            auth: true,
            user
        });

    } catch (error) {
        res.status(401).json({ error: "Unauthorized!", auth: false });
    };
};


export async function logoutUser(req, res) {
    try {
      res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
  
      res.status(200).json({ message: "User logged out successfully", auth: false });
    } catch (error) {
      res.status(500).json({error: "Error with Logout!", auth: true});
    };
  };