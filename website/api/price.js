// API route to fetch price data from Dexscreener
export default async function handler(request, response) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    // In a real implementation, you would fetch from Dexscreener's API
    // For now, we'll return mock data
    // const dexscreenerUrl = 'https://api.dexscreener.com/latest/dex/tokens/GLSBx98Bvoe5TKVCdPTHBt9rVyVAAh9z9pcAKj9C8KGc';
    // const res = await fetch(dexscreenerUrl);
    // const data = await res.json();

    // For demonstration purposes, returning mock data
    const mockData = {
      pairAddress: 'GLSBx98Bvoe5TKVCdPTHBt9rVyVAAh9z9pcAKj9C8KGc',
      price: (Math.random() * 0.0005).toFixed(8),
      priceChangePercentage: (Math.random() * 10 - 5).toFixed(2), // Random change between -5% and +5%
      liquidity: {
        usd: (Math.random() * 10000).toFixed(2)
      },
      volume: {
        h24: (Math.random() * 1000).toFixed(2)
      }
    };

    response.status(200).json(mockData);
  } catch (error) {
    console.error('Error fetching price data:', error);
    response.status(500).json({ error: 'Failed to fetch price data' });
  }
}