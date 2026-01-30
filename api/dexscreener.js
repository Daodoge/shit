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
    // Attempt to fetch data from Dexscreener's public API
    const dexscreenerUrl = 'https://api.dexscreener.com/latest/dex/tokens/GLSBx98Bvoe5TKVCdPTHBt9rVyVAAh9z9pcAKj9C8KGc';
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    let data;
    
    try {
      const res = await fetch(dexscreenerUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      
      data = await res.json();
    } catch (fetchError) {
      console.warn('Dexscreener API failed, using fallback data:', fetchError.message);
      
      // Return fallback/mock data if API fails
      const fallbackData = {
        pairAddress: 'GLSBx98Bvoe5TKVCdPTHBt9rVyVAAh9z9pcAKj9C8KGc',
        price: (Math.random() * 0.0005).toFixed(8),
        priceChangePercentage: (Math.random() * 10 - 5).toFixed(2), // Random change between -5% and +5%
        liquidity: {
          usd: (Math.random() * 10000).toFixed(2)
        },
        volume: {
          h24: (Math.random() * 1000).toFixed(2)
        },
        error: 'API temporarily unavailable, showing mock data'
      };
      
      response.status(200).json(fallbackData);
      return;
    }

    // Process the successful response
    if (data && data.pair && data.pair.priceUsd) {
      const pair = data.pair;
      
      const processedData = {
        pairAddress: pair.pairAddress || 'GLSBx98Bvoe5TKVCdPTHBt9rVyVAAh9z9pcAKj9C8KGc',
        price: parseFloat(pair.priceUsd).toFixed(8),
        priceChangePercentage: pair.priceChange?.h24 ? parseFloat(pair.priceChange.h24).toFixed(2) : '0.00',
        liquidity: {
          usd: pair.liquidity?.usd ? parseFloat(pair.liquidity.usd).toFixed(2) : '0.00'
        },
        volume: {
          h24: pair.volume?.h24 ? parseFloat(pair.volume.h24).toFixed(2) : '0.00'
        }
      };
      
      response.status(200).json(processedData);
    } else {
      // If the expected data structure isn't found, return fallback
      const fallbackData = {
        pairAddress: 'GLSBx98Bvoe5TKVCdPTHBt9rVyVAAh9z9pcAKj9C8KGc',
        price: '0.00000000',
        priceChangePercentage: '0.00',
        liquidity: {
          usd: '0.00'
        },
        volume: {
          h24: '0.00'
        },
        error: 'Unexpected API response format'
      };
      
      response.status(200).json(fallbackData);
    }
  } catch (error) {
    console.error('Error in dexscreener API route:', error);
    
    // Return fallback data in case of any error
    const errorResponse = {
      pairAddress: 'GLSBx98Bvoe5TKVCdPTHBt9rVyVAAh9z9pcAKj9C8KGc',
      price: (Math.random() * 0.0005).toFixed(8),
      priceChangePercentage: (Math.random() * 10 - 5).toFixed(2),
      liquidity: {
        usd: (Math.random() * 10000).toFixed(2)
      },
      volume: {
        h24: (Math.random() * 1000).toFixed(2)
      },
      error: 'Error processing request, showing mock data'
    };
    
    response.status(200).json(errorResponse);
  }
}