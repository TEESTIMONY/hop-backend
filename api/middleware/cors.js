/**
 * CORS middleware for all API endpoints
 */
module.exports = (req, res, next) => {
  // Get the origin header or default to '*'
  const origin = req.headers.origin;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Move to the next middleware/function
  if (typeof next === 'function') {
    next();
  }
}; 