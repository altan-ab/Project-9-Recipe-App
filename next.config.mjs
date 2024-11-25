/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_RECIPE_API_KEY: process.env.REACT_APP_RECIPE_API_KEY,
  },
}

export default nextConfig
