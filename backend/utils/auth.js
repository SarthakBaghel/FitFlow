const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

async function hashPassword(password){
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hash){
  return await bcrypt.compare(password, hash);
}

function signToken(payload){
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set. Set JWT_SECRET in your environment or .env file.");
  return jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token){
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set. Set JWT_SECRET in your environment or .env file.");
  return jwt.verify(token, secret);
}

module.exports = { hashPassword, comparePassword, signToken, verifyToken };
