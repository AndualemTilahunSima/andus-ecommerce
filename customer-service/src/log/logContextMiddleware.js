// Store the log context per request
const logContextMiddleware = (req, res, next) => {
  // Example: populate values from JWT or session
  req.logContext = {
    username: req.user?.username || 'anonymous',
    userId: req.user?.id || 'unknown',
    // Add other info as needed
    ip: req.ip,
    userAgent:req.get('User-Agent') || 'unknown'
  };

  next();
};

export default logContextMiddleware;
