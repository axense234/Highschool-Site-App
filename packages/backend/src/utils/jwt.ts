// JWT
import jwt from "jsonwebtoken";

const createJWT = (username: string, userId: string) => {
  return jwt.sign({ username, userId }, process.env.JWT_PRIVATE_KEY as string, {
    expiresIn: "12h",
  });
};

const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);
};

// EXPORTS
export { createJWT, verifyJWT };
