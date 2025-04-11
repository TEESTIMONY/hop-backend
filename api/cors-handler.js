module.exports = (req, res) => {
  // Get the origin from request headers
  const origin = req.headers.origin || '*';
  
  // Set CORS headers - allow the specific origin that's making the request
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // End preflight request immediately
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Pass through for non-OPTIONS requests
  res.status(405).end();
}; 