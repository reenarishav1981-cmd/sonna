// Minimal API-key auth for admin routes. Replace with proper JWT/session auth
// before any real deployment — this is enough to stop the admin endpoints
// being wide open in this prototype.
export function requireAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({ error: "ADMIN_KEY not configured on server" });
  }
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
