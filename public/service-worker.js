import { registerRoute } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';
import { setCacheNameDetails, clientsClaim } from 'workbox-core';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

setCacheNameDetails({ prefix: 'PKUHoleCE' });

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST, {});

registerRoute(
  /(manifest.webmanifest|static\/(fonts_7|bg)\/.*)$/,
  new CacheFirst({
    cacheName: 'PKUHoleCE',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 1296000,
        purgeOnQuotaError: false,
      }),
    ],
  }),
  'GET',
);
