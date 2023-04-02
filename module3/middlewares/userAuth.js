const express = require("express");
const db = require('../config/index');
const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        const login = await User.findOne({
            where: {
                login: req.body.login,
            },
        });
        if (login) {
            return res.json(409).send("login already taken");
        }

        const password = await User.findOne({
            where: {
                email: req.body.password,
            },
        });

        if (password) {
            return res.json(409).send("Authentication failed");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
 saveUser,
};