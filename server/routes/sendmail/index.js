const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mailController = require('../../controllers/mailController')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/send', mailController('send'))

module.exports = router
