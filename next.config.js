const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_BASE_URL}/v1/:path*/`,
      },
    ];
  },
};

module.exports = nextConfig;
