const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['nutman-strapi-images.s3.ap-northeast-1.amazonaws.com'],
  },
  i18n,
};

module.exports = nextConfig;
