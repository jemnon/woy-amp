module.exports = {
  async rewrites() {
    return [
      {
        source: '/web-stories',
        destination: '/',
      },
    ];
  },
};
