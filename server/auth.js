import crypto from "node:crypto";
import jwt from "jsonwebtoken";

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  if (x.length !== y.length) return false;
  return crypto.timingSafeEqual(x, y);
}

export function verifyCredentials(email, password) {
  return safeEqual(email.trim().toLowerCase(), process.env.ADMIN_EMAIL.trim().toLowerCase()) && safeEqual(password, process.env.ADMIN_PASSWORD);
}
export function createToken() {
  return jwt.sign({ role: "admin", email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: "12h", issuer: "vznn-portfolio" });
}
export function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET, { issuer: "vznn-portfolio" }); next(); }
  catch { return res.status(401).json({ message: "Invalid or expired session" }); }
}
