
const { getUserRoute } = require("../Controllers/userController");
const { OtpSender } = require("../Controllers/userController");
const { Otpverify } = require("../Controllers/userController");
const { editUserDetails } = require("../Controllers/userController");
const { Register, login } = require("../Controllers/userController");
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