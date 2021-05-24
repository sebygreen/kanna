const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load user model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // apply validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // check is a user exists already
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // apply validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // find a user by their email
    User.findOne({ email }).then(user => {
        if (!user) { // check if user exists
            return res.status(404).json({ emailNotFound: "User not found" });
        }

        // check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) { // user match
                const payload = { // jwt payload with user's name and id
                    id: user.id,
                    name: user.name
                };

                jwt.sign( // sign the jwt token
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 31556926 }, // 1 year
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordIncorrect: "Login failed" });
            }
        });
    });
});

module.exports = router;