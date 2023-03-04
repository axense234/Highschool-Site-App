// Pass Encryption
import bcrypt from "bcryptjs";

const encryptPassword = async (pass: string) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPass = await bcrypt.hash(pass, salt);
  return encryptedPass;
};

const verifyPassword = async (pass: string, encryptedPass: string) => {
  const match = await bcrypt.compare(pass, encryptedPass);
  return match;
};

// EXPORTS
export { encryptPassword, verifyPassword };
