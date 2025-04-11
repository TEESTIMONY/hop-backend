module.exports = (req, res) => {
  // Log headers for debugging
  console.log('Received request with headers:', req.headers);
  console.log('Method:', req.method);
  
  // Get the origin header or default to '*'
  const origin = req.headers.origin || '*';
  
  // Set CORS headers - allow the specific origin that's making the request
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', '*');  // Allow all headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Log what we're responding with
  console.log('Responding with CORS headers:', {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true'
  });
  
  // End preflight request immediately
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // For non-OPTIONS requests
  res.status(200).json({ message: 'CORS OK' });
}; 