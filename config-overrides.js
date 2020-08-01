module.exports = function override(config, env) {
  if (env.NODE_ENV === 'develop') return;
  const pwaConfig = config.plugins.slice(-1)[0].config;
  pwaConfig.cacheId = 'PKUHoleCE';
  pwaConfig.exclude = [/.*\.txt/];
  pwaConfig.runtimeCaching = [
    {
      urlPattern: new RegExp('static/(manifest.json|(fonts_7|bg)/.*)'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'PKUHoleCE',
        expiration: {
          maxAgeSeconds: 86400 * 15,
        },
        cacheableResponse: {
          statuses: [200],
        },
      },
    },
  ];
  return config;
};
