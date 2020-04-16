require('dotenv').config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const apiConf = require('./configs/apiConf');
const path = require('path');
var indexRouter = require('./routes/index');

const privateKey = fs.readFileSync('./certs/server.key', 'utf8');
const certificate = fs.readFileSync('./certs/server.cert', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = express();

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
    res.send('Welcome to Gooroo!')
});

// app.listen(4000, () => {
//     console.log("Listening on port 443");
// });

var httpsServer = https.createServer(credentials, app);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

httpsServer.listen(8443);