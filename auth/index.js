const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../db/user');

router.get('/', (req, res) => {
    res.json({
        message: 'success',
    })
});

function validateUser(user) {
    const validEmail = typeof user.email === 'string' && user.email.trim() !== '';
    const validPassword = typeof user.password === 'string' && user.password.trim() !== '' && user.password.trim().length >= 6;
    return validEmail && validPassword;
}

router.post('/login', (req, res, next) => {
    if (validateUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                if (user) {
                    console.log(user);
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(result => {
                            if (result) {
                                const isSecure = req.app.get('env') !== 'development';
                                res.cookie('user_id', user.id, {
                                    httpOnly: true,
                                    secure: isSecure,
                                    signed: true,

                                });
                                res.json({
                                    message: 'Logged In',
                                });
                            } else {
                                next(new Error('Invalid Login'));
                            }

                        });
                } else {
                    next(new Error('Invalid Login'));
                }
            })
    } else {
        next(new Error('Invalid Login'))
    }
});

router.post('/signup', (req, res, next) => {

    if (validateUser(req.body)) {
        User
            .getOneByEmail(req.body.email)
            .then(user => {
                console.log(user);
                //if user not found
                if (!user) {
                    //hash password
                    bcrypt
                        .hash(req.body.password, 10)
                        .then((hash) => {
                            const user = {
                                email: req.body.email,
                                password: hash,
                                created_at: new Date()
                            };
                            User
                                .create(user)
                                .then(id => {
                                    res.json({
                                        id,
                                        message: 'success',
                                    });
                                });
                        });

                } else {
                    next(new Error('Email in use'));
                }
            });
    } else {
        //send error
        next(new Error('Invalid User'));
    }
});

module.exports = router;

