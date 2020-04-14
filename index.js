require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const apiConf = require('./configs/apiConf');
const path = require('path');
var indexRouter = require('./routes/index');
const app = express();

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'newyork148x210',
//     database: 'gooroo_coding_test'
// });

// connection.connect(err => {
//     if(err) {
//         return err;
//     }
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type', 'Content-Type,Authorization', 'Access-Control-Allow-Origin', 'Authenticate', 'username', 'password');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

  app.use(apiConf.getApi(), indexRouter);

app.get('/', (req, res) => {
    console.log("ssss")
    res.send('Welcome to Gooroo!')
});

// app.put('/books/:book_id/edit', (req,res) => {
//     const { author, title, publisher } = req.query;
//     const INSERT_BOOK_QUERY = `INSERT INTO books (author, title, publisher) VALUES('${author}','${title}','${publisher}' )`;
//     connection.query(INSERT_BOOK_QUERY, (err, results) => {
//         if (err) {
//             return res.send(err)
//         }
//         else {
//             return res.send("Successfully added book");
//         }
//     });
// });

// app.post('/books/create', (req,res) => {
//     const { author, title, publisher } = req.query;
//     const INSERT_BOOK_QUERY = `INSERT INTO books (author, title, publisher) VALUES('${author}','${title}','${publisher}' )`;
//     connection.query(INSERT_BOOK_QUERY, (err, results) => {
//         if (err) {
//             return res.send(err)
//         }
//         else {
//             return res.send("Successfully added book");
//         }
//     });
// });

// app.get('/books/all', (req,res) => {
//     const SELECT_ALL_BOOKS_QUERY = 'SELECT * FROM books';
//     connection.query(SELECT_ALL_BOOKS_QUERY, (err, results) => {
//         if (err) {
//             return res.send(err)
//         }
//         else {
//             return res.json({
//                 data: results
//             })
//         }
//     });
// });

app.listen(4000, () => {
    console.log("Listening on port 4000");
})