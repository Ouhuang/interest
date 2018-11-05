const express = require("express");
const bodyParser = require('body-parser');
const https = require('https')
const fs = require('fs')

const app = express();
const webRouter = require('./app/router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', webRouter);


https.createServer({
    key: fs.readFileSync('./public/pem/privkey.pem'),
    cert: fs.readFileSync('./public/pem/fullchain.pem')
}, app)
    .listen(3000, () =>
        console.log('启动服务 8080'));