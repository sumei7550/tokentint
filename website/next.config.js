/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CREEM_API_KEY: process.env.CREEM_API_KEY,
    CREEM_PRODUCT_ID: process.env.CREEM_PRODUCT_ID,
  }
};

module.exports = nextConfig;
