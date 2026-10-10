const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Make sure to replace this with your actual secret

const authMiddleware = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.header('Authorization');

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ error: 'Accès refusé, token manquant' });
  }

  // Extract the token, assuming it starts with "Bearer "
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length) : null;

  // Check if the token is valid
  if (!token) {
    return res.status(401).json({ error: 'Accès refusé, token manquant ou malformé' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Handle invalid token
    res.status(401).json({ error: 'Token invalide' });
  }
};

module.exports = authMiddleware;
