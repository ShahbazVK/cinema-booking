const express = require('express');
const { login, register, showAll } = require('../controllers/userController');
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/', showAll)

module.exports = router