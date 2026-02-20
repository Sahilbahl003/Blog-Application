const Blog = require("../models/Blog.js");
const cloudinary = require("../config/cloudinary.js");


exports.createBlog=async(req,res)=>{
    try {
        console.log("Req body",req.body);
        console.log("Req user",req.user);
        console.log("Req file",req.file);
        const {title,content} = req.body;

        if(!title || !content)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        let imageUrl="";
        if(req.file)
        {
            const result= await new Promise((resolve,reject)=>{
                cloudinary.uploader.upload_stream({folder:"blogs"},(error,result)=>{
                    if(error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve(result);
                    }
                }).end(req.file.buffer);
            });
            imageUrl=result.secure_url;
        }
        
        const blog = await Blog.create({
            title,content,author:req.user.id,email:req.user.email,image:imageUrl
        });
        console.log(blog);
        return res.status(200).json({
            success:true,
            message:"Blog created successfully",
            blog
        });
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Error creating blog",
            error:error.message
    }); 
}};

exports.getAllBlogs=async(req,res)=>{
    try {
        const blogs=await Blog.find().populate("author","name email");
        return res.status(200).json({
            success:true,
            message:"Blogs fetched successfully",
            blogs
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error fetching blogs",
            error:error.message
        });
    }
}


exports.getBlogById=async(req,res)=>{
    try {
        const {id} = req.params;
        const blog=await Blog.findById(id).populate("author","name email");
        return res.status(200).json({
               success:true,
                 message:"Blog fetched successfully",
                blog
            });
    } catch (error) {
        return res.status(500).json({
            success:false,  
            message:"Error fetching blog",
            error:error.message
        }); 
    }
}

exports.getMyBlogs=async(req,res)=>{
    try {
        const userId = req.user.id;
        const blogs = await Blog.find({author:userId}).populate("author")
        res.status(200).json({
            success:true,
            blogs
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error fetching my blogs"
        })
    }
}

exports.deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            blog,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting blog",
            error: error.message
        });
    }
};



exports.updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    let imageUrl = blog.image;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      imageUrl = result.secure_url;
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = imageUrl;

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message
    });
  }
};
