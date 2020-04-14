const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const CTRL = require('../controllers');

    // AUTH
        ROUTER.post('/auth/token', CTRL.AUTH.authenticateToken) 
        ROUTER.post('/auth/login', CTRL.AUTH.loginContributor)
        ROUTER.post('/auth/logout', CTRL.AUTH.logoutContributor)
        ROUTER.post('/auth/register', CTRL.AUTH.registerContributor)

    // BOOKS
        ROUTER.get('/books/all', CTRL.BOOKS.getAllBooks)
        ROUTER.post('/books/create', CTRL.BOOKS.createBook)
        ROUTER.get('/books/:id/details', CTRL.BOOKS.getBookDetails)
        ROUTER.put('/books/:id/edit', CTRL.BOOKS.editBook)
        ROUTER.delete('/books/:id/delete', CTRL.BOOKS.deleteBook)

    // CONTRIBUTORS
        // ROUTER.get('/contributors/all', CTRL.CONTRIBUTORS.getAllContributors)
        ROUTER.get('/contributors/:id', CTRL.CONTRIBUTORS.getContributorDetails)

module.exports = ROUTER;