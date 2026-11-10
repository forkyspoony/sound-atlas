# Sound Atlas: notes for Claude Code

Read `HANDOFF.md` first. It covers the brief, status, decisions and a line map of `index.html`.

## Ground rules
- `index.html` is the whole app (vanilla JS, no build). It's about 431 KB, so **don't read it
  whole**. Use grep and the line map in HANDOFF.md, then read ranges.
- Content lives in JS constants inside `index.html` (`S`, `UNITS`, `LW`, `PAIRS`, `PHRASES`,
  `TERMS`, …). `content/*.json` is an exported snapshot for reference. Regenerate it with
  `python3 tools/extract_content.py . content` after content edits. Don't edit the JSON and
  expect the app to change.
- Deploy = push to `main`. GitHub Pages serves the repo root, usually about a minute after
  the push. The service worker caches nothing.
- The Android app was retired on 2026-11-09 (see HANDOFF.md, Decisions). Don't rebuild it;
  the installable site (PWA) is the only app. Never commit `*.jks` or key passwords.
- The owner is a language learner, not a developer. Explain changes in plain words.

## Testing
- Serve locally with `python3 -m http.server 8765`, then open http://localhost:8765/.
- Syntax check: extract the main `<script>` and run `node --check` on it.
- Regression: use Playwright to open each `#view`, run through lessons with `openLesson(id)`,
  and watch for `pageerror`. All 74 lessons passed on 2026-11-08.
- Sign-in won't work on localhost unless localhost is an authorized Firebase domain. Test
  sync on the live site.

## Conventions
- Storage keys: `localStorage['ipa:<key>']` through `store.get/set`.
- Language codes: `es`, `zh`, `ar`. Sound ids, e.g. `r`, `tap`, `ain`, `vy`.
- Audio: a new clip is `audio/a<sha1(text)[:10]>.mp3`, registered in `AUDIO`.
  ElevenLabs voices: Mateo (es), Alina (zh), Zohir (ar).
- Credit Seeing Speech for any new video use.
