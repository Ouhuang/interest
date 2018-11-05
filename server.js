'use strict'
const express = require("express");
const bodyParser = require('body-parser');
const os = require('os')
const fs = require('fs')
const https = require('https')

const app = express();
const webRouter = require('./app/router')
const token = require('./app/service/token')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', token, webRouter);


const server = os.platform() === 'linux' ? https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/emm.red/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/emm.red/fullchain.pem')
}, app) : app


server.listen(3000, () =>
    console.log('启动服务 3000'));
