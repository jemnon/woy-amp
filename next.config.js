module.exports = {
  target: 'serverless',
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) {
    return {
      '/': { page: '/' },
      '/garlic-and-mushroom-skillet-chicken': {
        page: '/[slug]',
        query: { slug: 'garlic-and-mushroom-skillet-chicken' },
      },
    };
  },
};
