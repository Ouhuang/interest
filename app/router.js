const express = require('express');
const router = express.Router();



const controller = require('./controller')

router.post('/login', controller.login)
router.post('/register', controller.register)
router.get('/crawler', controller.crawler)
router.post('/mock', controller.mock)
router.post('/mock/upload', controller['mock.upload'])


module.exports = router;