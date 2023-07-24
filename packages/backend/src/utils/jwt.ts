// JWT
import jwt from "jsonwebtoken";

const createJWT = (fullname: string, userId: string, userType: string) => {
  const jwtRes = jwt.sign(
    { fullname, userId, userType },
    process.env.JWT_PRIVATE_KEY as string,
    {
      expiresIn: process.env.JWT_EXP_DURATION || "6h",
    }
  );
  console.log(jwtRes);
  return jwtRes;
};

const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);
};

// EXPORTS
export { createJWT, verifyJWT };
