import jwt from 'jsonwebtoken';

export function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authorization token missing' });
  try {
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    const payload = jwt.verify(token, secret);
    req.user = payload; // { id, email, accountType }
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function requireAccountType(allowedTypes = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const { accountType } = req.user;
    if (allowedTypes.length === 0) return next();
    if (allowedTypes.includes(accountType) || accountType === 'both') return next();
    return res.status(403).json({ message: 'Forbidden: insufficient account type' });
  };
}


