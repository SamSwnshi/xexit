import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  let authHeader = req.header("Authorization");

  if (!authHeader || authHeader === 'undefined') {
    return res.status(401).json({ message: "Access Denied! No Token Provided" });
  }

  // Accept 'Bearer <token>', '<token>', or ' <token>'
  authHeader = authHeader.trim();
  let token = authHeader;
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }

  if (!token) {
    return res.status(401).json({ message: "Access Denied! No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log("Decoded user:", decoded); 
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req,res,next)=>{
    if(req.user.role === "admin"){
        next()
    }else{
        res.status(403).json({ message: 'Access denied' });
    }
}