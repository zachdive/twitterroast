/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable API routes for Netlify deployment
  // No need for 'target' property as it's deprecated
  // Disable image optimization
  images: {
    unoptimized: true,
  },
  // Removed 'output: export' to support API routes
  // Ensure API routes are treated as serverless functions
  trailingSlash: true,
}

module.exports = nextConfig
