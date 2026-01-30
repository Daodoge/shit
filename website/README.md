# Solana Contact Website

A dark mode website featuring Solana contact information and Dexscreener integration.

## Features

- Dark mode design with purple accents
- Solana wallet address display
- X community link
- Dexscreener integration with price display
- Responsive design for all devices

## Deployment

This project is ready for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the project and use the vercel.json configuration
3. The site will be deployed with static hosting

## Development

To run locally:
```bash
npx serve ./
```

## Note about Price Data

The price data shown on the site is currently simulated. To implement real-time price data from Dexscreener, you would need to either:

1. Use Dexscreener's API (if available)
2. Set up a backend service to fetch and cache the data
3. Implement CORS-enabled proxy to retrieve the data

## License

MIT