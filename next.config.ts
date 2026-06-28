/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allows Next.js to safely render images hosted on GitHub's asset repository and Imgur
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
