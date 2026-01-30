const express = require('express')
const { userRegister, userLogin, userLogout } = require('../controllers/user.controller')

const router = express.Router()

router.post("/Register", userRegister)
router.post("/Login", userLogin)
router.post("/Logout", userLogout)

module.exports = router