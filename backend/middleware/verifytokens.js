import jwt from "jsonwebtoken";
export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next(); // allow request to continue
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}