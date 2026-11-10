// Sound Atlas service worker: makes the site installable and usable offline.
//
// - The app itself (page, sync script, icons): always try the network first, so a new version
//   shows up right away. The saved copy is only used when the network fails or is very slow.
// - Recordings (audio/*.mp3): play the saved copy at once, and quietly re-check it in the
//   background, so a re-recorded clip replaces the old one by the next play.
// - Fonts and the Firebase sync library: same as recordings.
// Nothing here needs a version bump when the site changes.
const SHELL = 'sa-shell-v1';
const AUDIO = 'sa-audio-v1';   // index.html uses this same name for "Save for offline use"
const LIBS = 'sa-libs-v1';
const SHELL_FILES = ['./', 'firebase_shim.js', 'manifest.webmanifest', 'icons/favicon.svg', 'icons/icon-192.png'];
const LIB_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'www.gstatic.com'];
const SLOW_MS = 4000;

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).catch(() => {}));
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    if (!url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
    if (/\/audio\/[^/]+\.mp3$/.test(url.pathname)) e.respondWith(audio(e, url));
    else e.respondWith(shell(req, url));
  } else if (LIB_HOSTS.includes(url.hostname)) {
    e.respondWith(savedFirst(e, req, LIBS));
  }
  // everything else (videos, sign-in, Firestore) goes to the network untouched
});

// Network first; fall back to the saved copy if offline, or if the network takes too long.
async function shell(req, url) {
  const cache = await caches.open(SHELL);
  const key = req.mode === 'navigate' ? './' : url.pathname;
  const saved = await cache.match(key);
  const fresh = fetch(req).then(r => { if (r.ok) cache.put(key, r.clone()); return r; });
  if (!saved) return fresh;
  fresh.catch(() => {});
  const slow = new Promise(res => setTimeout(() => res(saved), SLOW_MS));
  return Promise.race([fresh.catch(() => saved), slow]);
}

// Saved copy first, refreshed in the background.
async function savedFirst(e, req, name) {
  const cache = await caches.open(name);
  const saved = await cache.match(req);
  const fresh = fetch(req).then(r => { if (r.ok || r.type === 'opaque') cache.put(req, r.clone()); return r; });
  if (!saved) return fresh;
  e.waitUntil(fresh.catch(() => {}));
  return saved;
}

// Recordings: saved copy first, refreshed in the background. Audio players ask for byte ranges,
// and some browsers (Safari) insist on a proper partial reply, so ranges are cut from the full file.
async function audio(e, url) {
  const cache = await caches.open(AUDIO);
  const key = url.origin + url.pathname;
  let full = await cache.match(key);
  const fresh = fetch(key).then(r => { if (r.status === 200) cache.put(key, r.clone()); return r; });
  if (full) e.waitUntil(fresh.catch(() => {}));
  else full = await fresh;
  const range = e.request.headers.get('range');
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!m || full.status !== 200) return full;
  const buf = await full.arrayBuffer(), size = buf.byteLength;
  let start = m[1] ? +m[1] : Math.max(0, size - +m[2]);
  let end = m[1] && m[2] ? Math.min(+m[2], size - 1) : size - 1;
  if (start > end || start >= size) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
  return new Response(buf.slice(start, end + 1), {
    status: 206, statusText: 'Partial Content',
    headers: {
      'Content-Type': full.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes'
    }
  });
}
