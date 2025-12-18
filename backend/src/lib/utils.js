import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    // For cross-site cookies (frontend on Vercel, backend on Render), SameSite must be 'none' and Secure must be true
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    secure: ENV.NODE_ENV === "production",
  });

  return token;
};

// http://localhost
// https://dsmakmk.com
