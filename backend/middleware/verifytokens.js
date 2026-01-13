import jwt from "jsonwebtoken";
export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.scope !== "generate") {
      return res.status(403).json({ error: "Invalid token scope" });
    }

    if (decoded.aud !== "public-app") {
      return res.status(403).json({ error: "Invalid token audience" });
    }
    req.token=decoded;
    next(); // allow request to continue
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}