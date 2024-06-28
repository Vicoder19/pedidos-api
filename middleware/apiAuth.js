// middleware/apiAuth.js
function apiAuth(req, res, next) {
    const apiKey = req.header('x-api-key');
    console.log('api:', apiKey);
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is missing' });
    }
  
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
  
    next();
  }
  
  module.exports = apiAuth;
  