# Sound Atlas: project handoff

Snapshot taken 2026-11-09 from GitHub `forkyspoony/sound-atlas`, branch `main`, commit
`b0afd27` ("New /sæ/ logo and Android app with self-update"). That commit is the latest
version of every file. Nothing newer exists anywhere else.

**Updates since the snapshot (2026-11-09):** sync now merges progress instead of overwriting
(see Decisions), and the **Android app was retired** (see Decisions). Where this document
still mentions the APK elsewhere, treat it as history.

- **Live site:** https://forkyspoony.github.io/sound-atlas
- **Old claude.ai copy:** https://claude.ai/artifact/1VwidV6YpmPm8GtADRXQU3 (stale, see Decisions)

---

## 1. Project brief

**What it is.** Sound Atlas is a web app that teaches the International Phonetic Alphabet
(IPA). It focuses on the sounds that are new or tricky for a native English speaker in three
target languages:

| Code | Course | Variety taught | Lessons |
|---|---|---|---|
| `es` | Spanish | Latin American Spanish | 23 |
| `zh` | Mandarin | Mainland Mandarin (Beijing standard) | 24 |
| `ar` | Arabic | Levantine Arabic (Syria, Lebanon, Jordan, Palestine) | 27 |

**Who it's for.** The owner (a native English speaker learning all three languages) uses it
to learn to produce each language's sounds correctly. One friend uses it too. It is
personal-scale: no accounts beyond optional Google sign-in, and no analytics.

**Core features (one view per top-nav tab, routed by URL hash):**

| Hash | Tab | What it does |
|---|---|---|
| `#today` | Today | Daily spaced-repetition review. New items per day (default 4) plus items that are due. |
| `#lessons` | Lessons | 74 guided lessons, one course at a time. A lesson is made of steps (types listed below). |
| `#learn` | Sounds | A card for each of 40 sounds. Each card has a mouth diagram, how-to steps, examples with audio, and **Diagram / Animation / MRI** tabs (Seeing Speech videos). |
| `#pairs` | Pairs | Minimal-pair listening drills (20 sets). |
| `#speak` | Speak | Record yourself and compare with a native speaker: word pitch compare, phrase shadowing, and a **vowel coach** that does live formant analysis on the mic. |
| `#vowels` | Vowels | Interactive vowel chart with side panel and MRI video. |
| `#tones` | Tones | Mandarin only. Tone contours and tone drills. |
| `#read` | Read Arabic | Arabic only. Letter forms, letter groups, reading practice. |
| `#quiz` | Quiz | Free-play quiz across sounds, tones and pairs. |
| `#transcribe` | Transcribe | Build the IPA transcription of a word from symbol buttons. |
| `#basics` | IPA basics | Terminology primer, plus **Move your progress** (copy or paste a progress code). |
| `#across` | Across languages | Compares the same sounds across the three languages. |

Lesson step types (`t` field): `text`, `sound`, `feel`, `cmp` (compare with English),
`sym` (symbol intro), `listen`, `build` (write IPA), `ruleq`, `pairs`, `speak`, `shadow`,
`quiz`, `tones`, `tpairs`.

Cross-cutting features:
- Native audio for about 550 words and phrases (ElevenLabs voices). The browser's speech
  synthesis is the fallback.
- "Speakers in drills" voice mix (13 voices), a slow-playback toggle, and a **flag bad
  audio** button with reasons.
- Optional Google sign-in syncs progress through Firebase. Without sign-in, progress
  lives in `localStorage` under keys prefixed `ipa:`.
- Installable as a PWA (manifest plus a service worker that also makes it work offline). This is the only
  install route; the separate Android app was retired.
- Light and dark themes through `prefers-color-scheme`.

**Tech stack.**
- **Front end:** a single `index.html` (about 431 KB, 3,586 lines) of vanilla HTML, CSS and JS.
  No framework, no bundler, no build step, no npm.
- **Fonts:** Google Fonts: Gentium Book Plus (IPA), Instrument Sans (UI), Noto Naskh Arabic.
- **Sync:** `firebase_shim.js` (ES module) loads Firebase JS SDK v11.0.2 from the gstatic
  CDN. It uses Auth (Google provider) and Firestore. The document lives at
  `users/<uid>/data/progress`.
- **Hosting:** GitHub Pages, deployed from `main` at `/` (root). `.nojekyll` is present.
- **Audio:** MP3s in `audio/`, generated with ElevenLabs. Files are referenced from tables
  inside `index.html`.
- **Videos:** hotlinked from Seeing Speech (`https://www.seeingspeech.ac.uk/recording/…`).
  They aren't stored in the repo.

---

## 2. Current status

### Working (deployed and checked on the live site)
- All 12 views. All 74 lessons and a full review session in each course ran without errors
  in a headless regression test (2026-11-08).
- SRS review, including the "📖 Revisit" button that jumps from a review card to the lesson
  that taught it.
- Google sign-in and Firestore sync on the web, plus the manual progress-code transfer.
- The live microphone works on GitHub Pages (this was the reason for moving off claude.ai).
- Diagram, Animation and MRI tabs on sound cards and lesson steps. All 40 sounds have MRI.
  Animations are missing for ɕ, tɕ, tɕʰ and all vowels because Seeing Speech has none, so
  that tab is greyed out on those. Some sounds show stand-ins with a note: the Arabic
  emphatics show plain s/t/d/z, the Mandarin affricates show their fricative, pʰ shows p,
  and t̪ shows t.
- The /sæ/ logo is used for the favicon, and PWA icons.
- Installing as a PWA on Windows, Android and iPhone ("Add to Home Screen").

### Half-done or untested
- **Google sign-in inside the iPhone home-screen app:** untested.
- **IPA terminology section with its own SRS deck:** started on 2026-11-09, then **scrapped at
  the owner's request**. Nothing from it is in the repo. About 60 term pronunciations were
  already generated in ElevenLabs (about 955 credits) and kept in ElevenLabs flow
  `DWqVXa8cXc7J53NQcjau`, so they can be reused at no cost. The existing `TERMS` glossary
  (37 terms, shown as tooltips through `termify()`) is still in place.

### Known or likely bugs
1. **Seeing Speech videos are hotlinked.** They will break if Seeing Speech moves or blocks
   them.
2. **ElevenLabs audio can slip** on hard sounds such as ع or the Mandarin tones. That's why
   the flag-audio feature exists. Flags are saved in progress (`flags`), and nobody has
   reviewed them yet.

### Planned next (what the owner was heading toward)
- Revisit the IPA terminology and jargon section (velar, alveolar and so on) when ready. The
  owner found the terms hard to learn and wanted SRS cards and pronunciations for them.
- Keep sharing the site with the friend. Updates reach them automatically.

---

## 3. Decisions (and why)

**Product and content**
- **One course at a time** (`COURSE`, switched with the course bar). It used to be a combined
  three-language view, but separate courses keep each lesson path coherent. The Tones tab is
  Mandarin-only and Read Arabic is Arabic-only.
- **Teach the IPA alongside pronunciation.** Spanish lessons were rebuilt so each lesson
  teaches a symbol, has you feel the sound, compares it with English, then has you hear,
  read, write and say it. The Mandarin and Arabic courses follow the same pattern.
- **Varieties:** Latin American Spanish (not Castilian), Beijing Mandarin, and **Levantine**
  Arabic rather than MSA. Voices were swapped to match: Spanish went from Leandro (Spain) to
  Mateo (LatAm), and Arabic went from Hassan B. (MSA) to Zohir (Syrian). Leandro is kept
  only for three Spain-only examples.
- **Autoplay** the word on every listening question, review included.
- **SRS:** Leitner-style boxes with intervals `[0,1,2,4,8,16,32,64]` days and 4 new items a
  day by default. Only items that have been introduced in a lesson enter review. Review
  keys: `s:<sound>[@lang]`, `p:<pair>`, `r:<lesson>` (rules), `b:<lesson>` (build),
  `t:tones|tpairs`, `a:<letter>|a:words`.

**Architecture**
- **Single self-contained HTML file.** It started as a claude.ai artifact, where one page is
  the natural unit. Keeping it that way means no build step and trivial hosting. Content
  (sounds, lessons, pairs and so on) lives as JS constants inside `index.html`. See
  `content/` for a JSON export.
- **Moved from claude.ai to GitHub Pages** because claude.ai artifacts can't use the
  microphone, which the Speak features need. The claude.ai artifact was then left behind.
  Its last update was "Review cards link to the lesson that teaches them" (2026-11-08), so
  it lacks the MRI tabs and the new logo. **Don't treat it as current.**
- **Firebase (Google sign-in plus Firestore) for sync.** It was picked over saving to a
  private GitHub gist with a pasted token, because signing in once is smoother across a phone
  and a computer. `firebase_shim.js` mimics the `claude.use('db'|'user')` API the app
  originally used on claude.ai, so the app code didn't change. Conflict rule (changed
  2026-11-09): the two copies are **merged**, never replaced (`mergeProgress` in `index.html`).
  Lessons done are unioned, stats and daily counts take the higher number, and for each
  review item the copy reviewed most recently wins (items carry a `u` timestamp set on
  review). Flags are unioned. Pasted progress codes merge the same way, with an Undo.
  A safety copy is kept in `localStorage` under `ipa:backup:sync` and `ipa:backup:import`.
- **The Firebase web config is public on purpose.** Security comes from the Firestore rules
  below, which live only in the Firebase console and are not in this repo:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{uid}/{doc=**} {
        allow read, write: if request.auth != null && request.auth.uid == uid;
      }
    }
  }
  ```
  `forkyspoony.github.io` must stay in Firebase Auth → Authorized domains.
- **Offline support (added 2026-11-09).** `sw.js` loads the app network-first, so every push
  still shows up right away; the saved copy is only used when offline or when the network
  takes over 4 seconds. Recordings, fonts and the Firebase library are served from the saved
  copy and re-checked in the background, so a re-recorded clip (same file name) replaces the
  old one by the next play. **IPA basics → Use offline** saves all recordings into the
  `sa-audio-v1` cache (the name is shared by `sw.js` and `index.html`). Seeing Speech videos
  and Wikimedia reference clips are not saved. Progress made offline merges on the next
  online load.
- **Audio file naming:** the main clips are `audio/a` + the first 10 hex characters of
  `sha1(text)` + `.mp3` (for example, 妈 → `ae3918a99aa.mp3`). Extra voices and some English
  examples are **sprites**. In `AUDIO` and `AUDIO_V`, a value of `["audio/s_liza.mp3", 0.35,
  1.015]` means "play that file from 0.35 s to 1.015 s". Files named `s_<voice>.mp3` are
  per-voice sprites, and `p_*.mp3` are pair or English sprites.
- **Seeing Speech videos are hotlinked, not copied,** to keep the repo small. Each video is
  credited in a caption and in the footer. The MRI shows the face on the **right**.
- **Android app retired (2026-11-09).** It was a thin WebView wrapper around the live site,
  but Google sign-in and the microphone could not work inside it, and the installable site
  (PWA) already does everything on Android. `android/` and `android-src/` were deleted; they
  remain in git history up to commit `43c13d7`. The site shows a notice to anyone still
  opening the old app (it detects `SoundAtlasApp/` in the user agent). The signing key is no
  longer needed.

**Design and naming**
- **Name:** "Sound Atlas". Subtitle: "IPA for Spanish, Mandarin & Arabic". Wordmark gloss:
  /saʊnd ˈætləs/.
- **Palette:** navy `#2b4c7e`, cream `#f6f1e7`, ink `#1f1b16`. Language colours are Spanish
  orange (`--es`), Mandarin red (`--zh`) and Arabic green (`--ar`), with dark-mode variants
  in `:root`.
- **Logo:** the **/sæ/ "IPA initials"** mark was chosen on 2026-11-09. It replaced the
  original /ə/ schwa tile with three language dots. Other concepts were tried and rejected:
  vowel map, wave globe, schwa pin, folded map and tongue compass.
- **Rejected:** keeping the claude.ai artifact as the main copy (no microphone), GitHub gist
  sync (clunkier), and the terminology section (scrapped for now, not rejected for good).

---

## 4. File structure

```
sound-atlas/
├── index.html               # The whole app: markup, CSS, JS and all content tables
├── firebase_shim.js         # Google sign-in + Firestore sync (ES module, Firebase v11 CDN)
├── sw.js                    # Service worker: installability + offline (see Decisions)
├── manifest.webmanifest     # PWA manifest
├── .nojekyll                # Tells GitHub Pages to serve files as-is
├── .gitignore               # *.jks, *.idsig
├── icons/                   # /sæ/ logo: favicon.svg/.png, apple-touch-icon, 192/512 + maskable
├── audio/                   # 440 MP3s (ElevenLabs): a<sha1-10>.mp3, s_<voice>.mp3, p_*.mp3
├── .claude/launch.json      # Local preview server setting
├── HANDOFF.md               # This file
├── CLAUDE.md                # Working notes for Claude Code
├── content/                 # JSON export of every content table in index.html (read-only snapshot)
└── tools/extract_content.py # Regenerates content/ from index.html (Playwright + Chrome)
```

### Map of `index.html` (approximate line numbers)
| Lines | What |
|---|---|
| 1–498 | `<head>`, CSS (variables in `:root`), and all view markup (`#v-<view>` sections, `#nav`) |
| 501–720 | Core data: `LANGS`, `PLACES`, **`S`** (40 sounds), `TONES`, `TONESETS`, `EXTRA_WORDS`, `SEGS`, `MAPS`, plus the `store` helper (localStorage) and stats |
| 727–770 | Audio playback: `AUDIO` table, `speak()`, TTS fallback, `playBtn()` |
| 779–830 | `TERMS` glossary, `termify()` tooltips |
| 844–940 | `mouthSVG()`, the generated mouth diagrams |
| 945–1125 | Sound cards, `PURE_SRC` reference vowels, `SS_VID` Seeing Speech map, visual tabs, vowel chart |
| 1136–1305 | Quiz engine (`mountQ`, `answerQ`), Transcribe |
| 1306–1373 | `PAIRS` and the drill player |
| 1374–1505 | `LW` word lexicon, `wd()`, lesson step helpers (`Q`, `RD`, `HR`) |
| 1507–2455 | **`UNITS`**: every lesson in all three courses |
| 2458–2583 | Lesson aliases, **SRS** (`BOX_DAYS`, `srs`, `newQueue`, `dueKeys`, Today sessions) |
| 2584–2623 | Persistence and sync (`persist`, `initSync`, `pushRemote`) |
| 2638–2775 | Lesson player (`openLesson`, `renderStep`, `finishLesson`) |
| 2784–2905 | Speak: recording, pitch analysis, compare chart |
| 2914–2975 | `VIEWS`, `route()`, course switching |
| 2976–3137 | Across languages, Arabic letters, Read Arabic |
| 3150–3243 | Formant tracking (LPC/Burg) for the vowel coach |
| 3244–3330 | `AUDIO_V` voice sprites, `VOICE_INFO`, playback bar, audio flags, `PHRASES` |
| 3347–3545 | Mic handling, live recording, vowel coach |
| 3550–3586 | Progress code import/export, init, SW registration, `firebase_shim.js` |

---

## 5. Files

Everything, including this file, is on GitHub: `git clone
https://github.com/forkyspoony/sound-atlas.git` gives an identical folder.

## 6. Content

`content/` has one JSON file per content table, exported from the running page. The
important ones:

| File | What |
|---|---|
| `S.json` | 40 sounds: `id, sym, name, desc, cat, place[], langs[], st (new/tricky/familiar), anchor, how[], ex[], note, rel[]` |
| `UNITS.json` | 11 units → 74 lessons → steps (`unit` is reduced to its id) |
| `LW.json` | 371-word lexicon `{l, w, ipa, g (gloss), r (romanization)}` used by lessons |
| `PAIRS.json` | 20 minimal-pair sets |
| `PHRASES.json` | 31 shadowing phrases |
| `TERMS.json` | 37 glossary terms (tooltips) |
| `AR_LETTERS.json`, `READ_GROUPS.json`, `READ_WORDS.json` | Read Arabic data |
| `TONES.json`, `TONESETS.json`, `TPAIRS.json` | Mandarin tone data |
| `SS_VID.json`, `PURE_SRC.json` | Seeing Speech video IDs and Wikimedia reference recordings |
| `AUDIO.json`, `AUDIO_V.json`, `VOICE_INFO.json`, `MAIN_VOICE.json` | Text → audio file / sprite maps and voices |
| others | `EXTRA_WORDS, SEGS, MAPS, ACROSS_NOTES, COURSE_INFO, LESSON_ALIAS, BOX_DAYS, VTARGET, GLIDE_HINT, …` |

**These are a snapshot, not the source.** The app still reads its content from the
constants in `index.html`. Edit there, or first refactor the app to load these files.
