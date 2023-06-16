// JWT
import jwt from "jsonwebtoken";

const createJWT = (username: string, userId: string) => {
  console.log("create jwt expiration duration: ", process.env.JWT_EXP_DURATION);
  return jwt.sign({ username, userId }, process.env.JWT_PRIVATE_KEY as string, {
    expiresIn: process.env.JWT_EXP_DURATION || "6h",
  });
};

const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);
};

// EXPORTS
export { createJWT, verifyJWT };
