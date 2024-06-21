const http = require('http');
const axios = require('axios');

// Mock gold rate data (replace with actual fetching from an API)
let currentGoldRate = 5000; // Example rate in INR per gram

// Create a basic HTTP server
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Endpoint to get the current gold rate
  if (req.url === '/api/gold-rate') {
    res.writeHead(200);
    res.end(JSON.stringify({ rate: currentGoldRate }));
  }
  // Endpoint to fetch current gold rate from a real API (example using metals-api.com)
  else if (req.url === '/api/real-gold-rate') {
    try {
      const response = await axios.get('https://metals-api.com/api/latest', {
        params: {
          access_key: 'YOUR_METALS_API_KEY', // Replace with your Metals API key
          base: 'XAU', // Gold base currency
          symbols: 'INR' // Convert to Indian Rupees (INR)
        }
      });

      const rate = response.data.rates.INR;
      res.writeHead(200);
      res.end(JSON.stringify({ rate }));
    } catch (error) {
      console.error('Error fetching real gold rate:', error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch real gold rate' }));
    }
  }
  // Handle 404 - Not Found
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
