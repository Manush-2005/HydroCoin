import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Government from "../models/Government.js";

dotenv.config();

const authGovMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized HTTP, Token not provided !" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log("Data :", isVerified);

    const userData = await Government.findOne({
      email: isVerified.email,
    }).select({ password: 0 });

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized ! Invalid Token" });
  }
};

export default authGovMiddleware;
