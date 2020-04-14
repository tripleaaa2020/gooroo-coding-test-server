const Response = require('../utils/ResponseTemplate');
const Contributors = require('../models').contributors;
// const { Op } = require('sequelize')

module.exports = {

    getAllContributors(req, response) {

        Contributors.findAndCountAll({
            attributes: ['contributorID', 'name', 'email'],
        })
            .then(data => {
                Response.success(
                    response,
                    data
                )
            })
            .catch(err => {
                Response.error(
                    response,
                    err
                )
            })
    },

    getContributorDetails(req, response) {

        const contributorID = req.params.id;

        Contributors.findOne({
            attributes: ['contributorID', 'name', 'email'],
            where: {
                contributorID: contributorID
            }
        })
            .then(data => {
                Response.success(
                    response,
                    data
                )
            })
            .catch(err => {
                Response.error(
                    response,
                    err
                )
            })
    }
};
