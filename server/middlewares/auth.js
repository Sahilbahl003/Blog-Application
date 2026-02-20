const jwt= require('jsonwebtoken')

exports.auth=(req,res,next)=>{
    try {
        const token= req.headers.token;
        if(!token)
        {
            return res.status(401).json({
                message:"token is missing",
                success:false,

            })
        }

        try {
            const payload = jwt.verify(token,process.env.JWT_SECRET);
             req.user=payload;
        } catch (error) {
            return res.json({
                message:"token invalid"
            })
            
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message:"Invalid or expired token"
        })
        
    }
}