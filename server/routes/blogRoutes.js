const { createBlog, getAllBlogs, getBlogById, getMyBlogs, deleteBlogById, updateBlogById } = require('../controllers/blogController.js')
const express=require('express')
const router = express.Router()
const { auth } = require('../middlewares/auth.js')
const upload=require("../config/multer.js");


router.post("/createblog",auth,upload.single("image"),createBlog);

router.get("/allblogs",getAllBlogs);
router.get("/allblogs/:id",getBlogById);
router.get("/myblogs",auth,getMyBlogs);
router.get("/myblogs/:id",auth,getBlogById);

router.delete("/deleteblog/:id",auth,deleteBlogById);

router.put("/updateblog/:id", auth, upload.single("image"), updateBlogById);

module.exports = router;