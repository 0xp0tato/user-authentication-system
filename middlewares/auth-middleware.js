import jwt from "jsonwebtoken";
import UserModel from "../models/userSchema.js";

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      //Get token from header
      token = authorization.split(" ")[1];

      //Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //Get user from token
      req.user = await UserModel.findById(userID).select("-password");
      next();
    } catch (error) {
      res.send({
        status: "failed",
        message: "Unauthorized User",
      });
    }
  }
  if (!token) {
    res.send({
      status: "failed",
      message: "Unauthorized User. No token provided",
    });
  }
};

export default checkUserAuth;
