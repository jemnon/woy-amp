const { configureSitemap } = require('@sergeymyssak/nextjs-sitemap');

async function fetchDynamicPaths() {
  return [
    'homemade-pumpkin-spice-coffee-creamer',
    'homemade-pumpkin-pie-spice',
    'pumpkin-spice-french-toast',
    'grilled-peach-panzanella-with-burrata',
    'garlic-and-mushroom-skillet-chicken',
  ];
}

async function getDynamicPaths() {
  const paths = await fetchDynamicPaths();
  return paths.map(item => `/web-stories/${item}`);
}

getDynamicPaths().then(paths => {
  const Sitemap = configureSitemap({
    domains: [{ domain: 'www.whisperofyum.app', defaultLocale: 'en' }],
    include: paths,
    exclude: ['/web-stories/*', '/api', '/api/*'],
    excludeIndex: true,
    pagesConfig: {
      '/web-stories/*': {
        priority: '0.5',
        changefreq: 'daily',
      },
    },
    trailingSlash: false,
    targetDirectory: __dirname + '/public',
    pagesDirectory: __dirname + '/pages',
  });

  Sitemap.generateSitemap();
});
