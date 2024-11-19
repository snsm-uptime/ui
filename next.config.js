const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/transactions",
        destination: `${process.env.API_BASE_URL}/v1/transactions/`,
      },
      {
        source: "/api/transactions/pull",
        destination: `${process.env.API_BASE_URL}/v1/transactions/pull`,
      },
    ];
  },
};

module.exports = nextConfig;
