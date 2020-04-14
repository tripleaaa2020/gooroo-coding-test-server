const Response = require('../utils/ResponseTemplate');
const Contributors = require('../models').contributors;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/TokenGenerator').setAuthToken;
// const { Op } = require('sequelize')

module.exports = {

    authenticateToken(req, response) {

        console.log("WENT HERE authenticateToken");
        const token = req.headers.authorization;

        if (token !== undefined) {
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                console.log("user => ", user);
                if (err) {
                    Response.fail(
                        response,
                        {
                            message: 'Token Expired',
                            tokenAuthenticated: false,
                        }
                    );
                }
                else {

                    const {contributorID, email, name} = user;
                    let token = generateToken(contributorID, email, name)

                    Response.success(
                        response,
                        {
                            message: 'Token Authenticated',
                            tokenAuthenticated: true,
                            authToken: token
                        }
                    );
                }
            })
        }
        else {
            Response.fail(
                response,
                {
                    message: 'No Token Found',
                    tokenAuthenticated: false,
                }
            );
        }
    },

    loginContributor(req, response) {

        console.log("WENT HERE LOGIN");

        const { email, password } = req.body;

        Contributors.findOne({
            where: {
                email: email
            }
        })
            .then(contributor => {
                if (contributor) {
                    console.log("Contributor datavalues=> ", contributor.dataValues);
                    if (bcrypt.compareSync(password, contributor.password)) {

                        const {contributorID, email, name} = contributor.dataValues;
                        let token = generateToken(contributorID, email, name);
                        
                        Response.success(
                            response,
                            {
                                authToken: token,
                            },
                        );
                    }
                    else {
                        const err = "Wrong password"
                        Response.fail(
                            response,
                            err
                        );
                    }
                }
                else {
                    const err = "Email does not exist";
                    Response.fail(
                        response,
                        err
                    );
                }
            })
            .catch(function (err) {
                Response.error(response, err)
            })

    },

    logoutContributor(req, response) {

        console.log("WENT HERE LOGOUT");

        const today = new Date();
        let todayGMT7 = new Date(today.setHours(today.getHours() + 7));

        Contributors.findOne(
            {
                where: {
                    authToken: req.body.headers.Authorization
                }
            }
        ).then(data => {
            if (data !== null) {
                data.update({
                    refreshToken: null,
                    updatedAt: todayGMT7
                })
                    .then(res => {
                        Response.success(
                            response,
                            { msg: 'Logout Success!!' },
                        )
                    })
            } else {
                Response.fail(
                    response,
                    { message: 'Contributor not found' }
                );
            }
        })
            .catch(function (err) {
                console.log(err);
                Response.error(response, err)
            })

    },

    registerContributor(req, response) {

        console.log("WENT HERE REGISTER");

        const today = new Date();
        let todayGMT7 = new Date(today.setHours(today.getHours() + 7));
        const { name, email, password } = req.body;

        const contributorData = {
            name: name,
            email: email,
            password: password,
            createdAt: todayGMT7,
            updatedAt: todayGMT7,
        }

        Contributors.findOne({
            where: {
                email: email
            }
        })
            .then(contributor => {
                if (!contributor) {
                    bcrypt.hash(password, 10, (err, hash) => {

                        contributorData.password = hash;

                        Contributors.create(contributorData)
                            .then(contributor => {
                                Response.success(
                                    response,
                                    contributor
                                )
                            })
                            .catch(err => {
                                Response.error(
                                    response,
                                    err
                                )
                            });

                    });
                }
                else {
                    const err = "This email is already in use by another contributor!";
                    Response.fail(
                        response,
                        err
                    )
                }
            })
            .catch(err => {
                Response.error(
                    response,
                    err
                )
            })
    }
};
