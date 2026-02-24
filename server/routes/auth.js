const express = require('express');
const { register, login, getUser,  updateProfileFull, changePassword, removeProfileImage } = require('../controllers/authController');
const { auth } = require('../middlewares/auth');
const router = express.Router();
const upload=require("../config/multer.js");
const {sendOtp,verifyOtp,resetPassword,} = require("../controllers/authController");
const {sendRegisterOtp,verifyRegisterOtp,} = require("../controllers/authController");





router.post("/register",register);
router.post("/login",login);

router.get("/profile",auth,getUser);

router.put("/updateProfile",auth, upload.single("image"),updateProfileFull);

router.put("/changePassword",auth,changePassword);

router.put("/removeProfileImage", auth, removeProfileImage);



router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);


router.post("/register-otp", sendRegisterOtp);
router.post("/verify-register", verifyRegisterOtp);


module.exports = router;
