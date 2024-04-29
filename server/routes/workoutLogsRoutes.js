const express = require("express")
// const nodemailer = require("nodemailer")
const router = express.Router()
const {
	save,
	get,
	deleteLogs,
} = require("../controllers/workoutLogsController")
const {
	jsonWebTokenAndCsrfProtection,
} = require("../middlewares/authMiddleware")

router.post("/save", [jsonWebTokenAndCsrfProtection], save)
router.post("/get", [jsonWebTokenAndCsrfProtection], get)
router.post("/delete", [jsonWebTokenAndCsrfProtection], deleteLogs)

module.exports = router
