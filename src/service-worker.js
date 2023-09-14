'use strict';

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/offline.html',
];

self.addEventListener('install', (evt) => {
});

self.addEventListener('activate', (evt) => {
});

self.addEventListener('fetch', (evt) => {
});
