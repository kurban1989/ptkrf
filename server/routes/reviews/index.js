const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const reviewsController = require('../../controllers/reviewsController')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/get-all', reviewsController('getAll'))
router.post('/set', reviewsController('saveRev'))
router.post('/confirm', reviewsController('saveRev'))

module.exports = router
