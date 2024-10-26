/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable API routes for Netlify deployment
  // No need for 'target' property as it's deprecated
  // Disable image optimization
  images: {
    unoptimized: true,
  },
  // Remove 'output: export' to support API routes
  // Configure for serverless deployment on Netlify
}

module.exports = nextConfig
