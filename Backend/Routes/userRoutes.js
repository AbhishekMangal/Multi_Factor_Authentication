
const { getUserRoute } = require("../Controllers/userController.js");
const { OtpSender } = require("../Controllers/userController.js");
const { Otpverify } = require("../Controllers/userController.js");
const { editUserDetails } = require("../Controllers/userController.js");
const { Register, login } = require("../Controllers/userController.js");
const fetchUser = require("../middleWare/fetchuser");


const router = require("express").Router();
router.post("/register", Register)
router.post("/login", login)
router.get("/getUser",fetchUser, getUserRoute);
router.put('/update-user', fetchUser, editUserDetails)
router.post('/update-user', fetchUser, editUserDetails)
router.post('/otp-sender', OtpSender)
router.post('/otp-verify', Otpverify)
module.exports = router