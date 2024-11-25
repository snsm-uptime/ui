const nextConfig = {
  env: {
    DEFAULT_ROWS: "25" //process.env.DEFAULT_ROWS || "5"
  },
  async rewrites() {
    return [
      {
        source: "/api/transactions",
        destination: `${process.env.API_BASE_URL}/v1/transactions/`,
      },
      {
        source: "/api/transactions/metrics",
        destination: `${process.env.API_BASE_URL}/v1/transactions/metrics`,
      },
      {
        source: "/api/transactions/expenses",
        destination: `${process.env.API_BASE_URL}/v1/transactions/expenses`,
      },
      {
        source: "/api/transactions/pull",
        destination: `${process.env.API_BASE_URL}/v1/transactions/pull`,
      },
    ];
  },
};

module.exports = nextConfig;
