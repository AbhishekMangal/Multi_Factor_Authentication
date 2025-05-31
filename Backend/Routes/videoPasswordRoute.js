
const { createVideoPassword, updateVideoPassword, verifyVideoPassword } = require("../Controllers/VideoPasswordController");
const fetchUser = require("../middleWare/fetchuser");
const { default: videoPassword } = require("../middleWare/videoMiddleware");
const router = require("express").Router();

router.post('/create',fetchUser, createVideoPassword);
router.post('/verify',fetchUser, verifyVideoPassword);
router.post('/update',fetchUser, updateVideoPassword);


module.exports = router