// Function to fetch price data from Dexscreener
async function fetchDexscreenerData() {
    try {
        // Fetch data from our API route
        const response = await fetch('/api/price');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const priceElement = document.getElementById('price-value');
        if (priceElement) {
            priceElement.innerHTML = `
                <span class="price-amount">$${parseFloat(data.price).toFixed(8)}</span>
                <div class="price-change ${data.priceChangePercentage >= 0 ? 'positive' : 'negative'}">
                    ${data.priceChangePercentage >= 0 ? '↑' : '↓'} ${Math.abs(data.priceChangePercentage)}% (24h)
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching price data:', error);
        const priceElement = document.getElementById('price-value');
        if (priceElement) {
            priceElement.innerHTML = '<span class="error">Price unavailable</span>';
        }
    }
}

// Load price data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchDexscreenerData();
    
    // Refresh price every 60 seconds
    setInterval(fetchDexscreenerData, 60000);
});