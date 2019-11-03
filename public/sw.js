// This service worker file is effectively a 'no-op' that will reset any
// previous service worker registered for the same host:port combination.
// In the production build, this file is replaced with an actual service worker
// file that will precache your site's local assets.
// See https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432

const CACHE_NAME = "2dance-app-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", () => {
  self.clients.matchAll({ type: "window" }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});

/*self.addEventListener("fetch", function(event) {
  const req = event.request;
  if (req.method === "GET" && req.url.indexOf(self.location.origin) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(req).then(matching => {
          if (matching) {
            return matching;
          } else {
            return fetch(req).then(res => {
              return res.ok ? cache.put(req, res.clone()).then(() => res) : res;
            });
          }
        })
      )
    );
    event.waitUntil(update(req));
  } else {
    event.respondWith(fetch(req));
  }
});*/

function update(request) {
  return caches.open(CACHE_NAME).then(cache =>
    cache.delete(request).then(isDel => {
      return fetch(request).then(response =>
        cache.put(request, response).then(() => response)
      );
    })
  );
}
