# Sound Atlas: project handoff

Snapshot taken 2026-11-09 from GitHub `forkyspoony/sound-atlas`, branch `main`, commit
`b0afd27` ("New /sæ/ logo and Android app with self-update"). That commit is the latest
version of every file. Nothing newer exists anywhere else.

**Updates since the snapshot (2026-11-09):** sync now merges progress instead of overwriting
(see Decisions), and the **Android app was retired** (see Decisions). Where this document
still mentions the APK elsewhere, treat it as history.

**Picking this up in a new chat? Start at "Roadmap: where we are" in section 2.** It lists
what is built, what is waiting on the owner's testing, and what comes next. As of
2026-11-10 the latest feature commit on `main` is `032155f` (roadmap items 15 and 16: Tone
pairs and 15 more phrases), and everything built so far is pushed.

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
| `#learn` | Sounds | A card for each of 40 sounds. Each card has a mouth diagram, how-to steps, examples with audio, and **Diagram / Animation / MRI** tabs (Seeing Speech videos; if a video fails to load the diagram is shown instead). A **weak spots** table at the top lists, per sound, how well you know the symbol, hear it and say it. |
| `#pairs` | Pairs | Minimal-pair listening drills (20 sets), plus an **adaptive drill** that leans toward the contrasts and words you miss most. |
| `#speak` | Speak | Record yourself and compare with a native speaker: word pitch compare, phrase shadowing, and a **vowel coach** that does live formant analysis on the mic. Added 2026-11-09: **Tone coach** (Mandarin, live pitch line over the target tone), **Puff meter** (Mandarin and Spanish, measures the puff of air after p/t/k) and **Trill check** (Spanish, counts tongue flicks in r/rr). Recordings of each word are kept on the device so earlier tries can be replayed. |
| `#vowels` | Vowels | Interactive vowel chart with side panel and MRI video. |
| `#tones` | Tones | Mandarin only. Tone contours and tone drills. |
| `#read` | Read Arabic | Arabic only. Letter forms, letter groups, reading practice. |
| `#quiz` | Quiz | Free-play quiz across sounds, tones and pairs. |
| `#transcribe` | Transcribe | Build the IPA transcription of a word from symbol buttons. A **dictation** mode hides the word so you write from sound alone. Words come from `trPool` (the starter list plus every recorded single word whose sounds are all on the keyboard: 101 es, 60 zh, 79 ar). |
| `#basics` | IPA basics | Terminology primer, **Practise the jargon** (tap a place on a mouth map, or match a term to its meaning; misses are counted in `stats['tm:<term>']` and come back more often), plus **Move your progress** (copy or paste a progress code). |
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

### Roadmap: where we are (updated 2026-11-10)

The goal behind all of this: get the owner to **say** each language's sounds correctly, not
only recognise them. The roadmap came from a brainstorm on 2026-11-09. Details of each
built item are in section 3 (Decisions).

**Done and live** (pushed to `main`; each ran clean in a local regression of all 12 views
and 74 lessons, using the app's native clips in place of a microphone):

| # | Feature | Where | Commit |
|---|---|---|---|
| 1 | Speaking cards in the daily review (record, compare, self-rate) | Today | `f968c6a` |
| 2 | Adaptive listening drill, per-word miss tracking | Pairs | `f968c6a` |
| 3 | Tone coach (Mandarin) | Speak | `f968c6a` |
| 4 | Puff meter (Mandarin, Spanish) | Speak | `f968c6a` |
| 5 | Trill check (Spanish) | Speak | `f968c6a` |
| 6 | Own recordings kept over time | Speak, speaking cards | `f968c6a` |
| 7 | Weak-spots table (know / hear / say per sound) | Sounds | `d96f677` |
| 8 | Dictation mode and larger word pool | Transcribe | `d96f677` |
| 9 | Jargon practice (mouth map, term matching) | IPA basics | `d96f677` |
| 10 | Diagram fallback when a video fails | Sound cards | `d96f677` |
| 11 | Measurements on speaking cards (puff, flicks, tone match) | Today | `0e7c7a9` |
| 12 | Today's focus box | Today | `0e7c7a9` |
| 13 | 24 extra shadowing phrases with recordings | Speak → Phrases | `c9fd5b6` |
| 14 | `carro` and `guerra` re-recorded with a real trill | Trill check, Pairs | `c9fd5b6` |
| 15 | Tone pairs: say a two-syllable word, melody match against four native speakers | Speak → Tone pairs (also a button on Tones) | `032155f` |
| 16 | 15 more phrases tied to the rule lessons, with recordings | Rule lessons' shadowing step, Speak → Phrases | `032155f` |
| 17 | Mix-up drill: hear a hidden word from any course, say which look-alike sound it has (r, t, p/b, h, sh) | Across languages | `744db94` |

Items 15 and 16 were built on 2026-11-10 and passed the local regression (12 views, every
Speak mode, 74 lessons / 582 steps, no errors). They were pushed the same day.

Item 17 was built later on 2026-11-10 and pushed the same day. It uses
only existing recordings. Checked locally: every round type runs to the end, all 12 views
open without errors (lessons were not re-run; nothing they use changed). Details in
Decisions.

**Built and pushed on 2026-11-10 (`159e3c3`): item 18, symbol gaps.** The owner said
the Write-it-in-IPA questions felt like being tested on things not yet taught, and asked for
them to find and fill gaps instead. What was built (all in `index.html`, "SYMBOL GAPS" block
just above `mountBuild`):

- **Slip pinpointing.** `symSlips(got,want)` lines up the tiles you tapped with the answer
  and names each slip: wrong symbol, missing symbol, extra symbol, wrong order, or a stress
  mark that is missing, extra or misplaced. `slipsHTML()` shows one short explanation per
  slip, the lesson that covers the symbol, and a button to its sound card. Used by lesson and
  review build questions (`mountBuild`) and by Transcribe (`checkTr`).
- **Notes.** `SYM_NOTES` has a hand-written line for every symbol and every wrong tile used
  in the build questions and on the Transcribe keyboard, for all three courses (`es`, `zh`,
  `ar`; `all` holds the stress mark). Mandarin and Arabic were added later on 2026-11-10 and
  pushed the same day. A symbol with no entry falls back to its sound card's
  name and first how-to line. When adding a build question with a new tile, add its note too.
- **Tally.** `stats['y:<lang>:<symbol>']` counts hits and misses per symbol (`tallySyms`).
  `weakSyms(lang)` = missed at least twice and right under about 70% of the time.
- **Using the tally.** Transcribe and the `b:` review cards pick words with weak symbols more
  often (`wpick`), and Today shows a "Symbols to shore up" box (`gapsHTML`).
- **Transcribe only uses covered symbols.** `coveredSyms(lang)` = symbols from finished
  lessons (what each lesson builds, its sound cards and its symbol tables, `lessonSyms`).
  Words and keyboard keys are limited to those; an "All symbols" chip (`trAll`) turns the
  limit off. With no lessons done the page says so and offers the next lesson.

Checked locally: 74 lessons / 582 steps opened and all 131 build questions answered (half
right, half wrong) with no errors; Transcribe, the Today box and the slip messages were
looked at in the browser. Re-run after the Mandarin and Arabic notes went in: same result,
every wrong answer showed an explanation, and no symbol in any course is missing a note.
Not checked: sync of the new tallies on the live site.

**➡ YOU ARE HERE: waiting on the owner's testing.** None of items 1–16 has been tried with
a real microphone or listened to by a person. The owner said they would test later, then
asked (2026-11-10) to keep building from the roadmap anyway. The things most likely to need
adjusting:

- **Tone pairs (item 15).** The match score was checked only by playing each native speaker
  against the other three. Ask how it behaves with the owner's own voice. `考试` often gives
  no reading (two short syllables, one creaky).
- **The 15 newest phrases (item 16).** Same caveat as the 24 before them: nobody has
  listened yet, and the IPA is Claude's.
- **Mix-up drill (item 17).** Ask whether the choices' wording is clear and whether any
  group is too easy. Known weakness: where a choice belongs to one language only (Mandarin
  r, Arabic ش), hearing which language it is gives the answer away.

- **Thresholds in the measuring tools** (tone coach, puff meter, trill check). They were
  tuned on ElevenLabs clips, not on a learner's voice through a phone microphone. If a
  reading looks wrong, ask which word and what it showed, then adjust in `tcVerdict`,
  `pfTarget` / `votMeasure` or `trillMeasure`.
- **The 24 new phrases.** Check by ear that each says the right words, and that the IPA
  (written by Claude, unreviewed) matches what the speaker says. Arabic is the least certain.
- **The mouth map on a phone.** The dots at the front of the mouth are close together.
- **Speaking cards in practice.** Three a day are added for sounds already in review; check
  the pace feels right and that recording works inside a review session.
- **Google sign-in inside the iPhone home-screen app** is still untested (older item).

**Next, in suggested order** (not started):

1. **Fix whatever the owner's testing turns up** (see above).
2. **Review flagged audio.** Nobody has gone through the flags yet. Re-record flagged clips
   the way `carro` was done: generate several takes, measure or check them, keep the best.
3. ~~More connected-speech practice~~ **Done 2026-11-10** (item 16). More can be added the
   same way if the owner wants a rule covered further.
4. ~~Two-syllable tone practice with feedback~~ **Done 2026-11-10** (item 15).
5. **Terminology in the daily review.** Jargon practice (item 9) is free practice only. The
   owner once wanted SRS cards for terms, then scrapped that deck, so **ask before adding
   terms to the review queue**. About 60 term pronunciations already exist in ElevenLabs
   flow `DWqVXa8cXc7J53NQcjau` and can be reused at no cost.
6. ~~Cross-language mix-up drills~~ **Built 2026-11-10** (item 17), listening only. A
   speaking version (say the word, get measured) could reuse the puff meter and trill check.
7. **Real human recordings** for the sounds where generated voices slip (for example from
   Wikimedia's Lingua Libre, with credit). Not started; check licences first.

**Considered and dropped:** a sibilant comparison for s / ʂ / ɕ (too unreliable across
voices and microphones), and feedback on the Arabic throat sounds and emphatics (no simple
signal to measure).

**How to work on this (things a new chat would otherwise have to rediscover):**

- **ElevenLabs.** The owner has approved using credits as needed (said 2026-11-10). There is
  no API key on this machine; recordings are made through the ElevenLabs connector:
  `creative_generate_speech` with model `eleven_v4`, several items in one prompt separated
  by ` …… `, then `creative_get_flow_run_status` to get each take's download link. Voice
  ids: Mateo `WMpAKHr8NOKA29XOHZkk`, Alina `WfA47nTEqsxcbtplkPLI`, Zohir
  `ir4AMoF6bJOiiv5tgHOC`. Save the take into `audio/`, find each item's start and end by
  splitting on silence, and register it as a sprite: `AUDIO[text]=[file,start,end]`.
  There is no `ffmpeg` here, so files can't be cut or re-encoded; sprites avoid the need.
  The connector's transcription lines the script up against the audio, so it confirms
  timing but is not an independent check of pronunciation.
- **Testing without Node or Playwright.** Neither is installed. Start the preview server
  (`sound-atlas` in `.claude/launch.json`, port 8765) and drive the page with JavaScript in
  the browser pane: loop over `VIEWS`, `openLesson(id)` and `renderStep()`, and feed native
  clips to the measuring functions. Clear the test progress from `localStorage` afterwards.
- **`content/` can't be regenerated here** (the export tool needs Playwright). It is stale
  for `PHRASES` and `AUDIO` since `c9fd5b6`.
- **Commits.** Git has no name or email set on this machine. Commits so far were made as
  `Claude <noreply@anthropic.com>` with `git -c user.name=… -c user.email=…`, matching the
  earlier history. Commit and push only when the owner asks; a push to `main` is the deploy.
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
  `t:tones|tpairs`, `a:<letter>|a:words`, and `k:<sound>[@lang]` (speaking cards, below).
- **Speaking cards in review (2026-11-09).** Every sound in review (`s:`) gets a partner
  `k:` card: hear a word, record it, hear native then yourself, and self-rate Off / Close /
  Matched. Off sends it back to tomorrow, Close repeats the same gap, Matched moves it up.
  Existing progress gets its `k:` cards three a day (`ensureSayItems`). A checkbox on Today
  turns them off (`srs.settings.say`), and "Can't speak right now" drops them from one session.
- **Adaptive listening (2026-11-09).** `stats['pw:<lang>:<word>']` counts hits and misses for
  each word when it was the one played. `pairQ` plays the weaker pair and word more often
  (capped at 65/35 so guessing doesn't pay), and speakers never repeat twice in a row.
- **Speaking tools are guides, not grades (2026-11-09).** The tone coach, puff meter and
  trill check were tuned against the app's own native clips: puff 4–49 ms for no-puff words
  vs 105–160 ms for Mandarin p/t/k; trills found in perro, corro, tierra, rojo, rosa, río.
  The native `carro` and `guerra` clips showed only one flick, so they were left out of the
  trill list (they may be worth re-recording). Tone 3 is the loosest check because creaky
  voice breaks pitch tracking. None of these has been tested with a real microphone yet.
  A sibilant (s / ʂ / ɕ) comparison was considered and not built: too unreliable.
- **Trill check made steadier (2026-11-10).** The owner reported that the count changed from
  try to try on a headset microphone. Cause: `trillMeasure` followed the loudness of the high
  frequencies, which microphone hiss fills in, so closures hovered around the cut-off. It now
  follows the 250–1800 Hz band with the steady background noise taken off, skips the first
  40 ms (the k of `coro` used to count as a flick), needs closures 26–70 ms apart, and lets
  shallow closures (60–72%) count only inside a run with two clear ones. Tested on the 12
  native clips under 23 conditions (added hiss down to 6 dB, narrow headset band, mains hum,
  time shifts): taps always 1, trills always 2 or more. Native counts are now perro 3,
  corro 4, carro 3, tierra 4, rojo 3, rosa 3, río 3. Still not confirmed on the owner's own
  voice; if it is still off, ask which word and what it showed.
- **Speaking cards show a measurement where one fits (2026-11-10, `sayMeasure`).** Puff length
  for `pu`/`ph` words that start with p/t/k, flick count for the Spanish trill `r`, and for
  single Mandarin syllables the same pitch-match percentage the Speak tab uses. The tone
  coach's own verdict is not used on cards: it faulted native clips of ordinary words.
- **Today's focus (2026-11-10, `focusHTML`).** Today shows the single weakest score in the
  course (hear, say or know, under 85%) with a button for the matching tool: a pair drill,
  the puff meter or trill check, the Speak tab, or the lesson that teaches the sound.
- **24 extra shadowing phrases (2026-11-10).** Eight per language (`esx1`–`8`, `zhx1`–`8`,
  `arx1`–`8`), added with `PHRASES.push` just above `PHBY`. They have no `lesson`, so they
  appear only in Speak → Phrases. Each language is one recording (`audio/p_c5_<lang>.mp3`,
  model `eleven_v4`, voices Mateo / Alina / Zohir) cut into sprites by hand-checked times.
  The IPA was written by Claude and has not been reviewed by a native speaker; the audio
  was checked for clean cuts and word timing, but nobody has listened to it yet.
- **`carro` and `guerra` re-recorded (2026-11-10)** as sprites in `audio/p_c5_rr.mp3`; the
  trill check now finds 3 and 2 flicks. `carro` is back in the trill list. The old
  whole-file clips are still in `audio/` but unused. ElevenLabs flow for this batch:
  `vjc9fvq5PAfWGifkmj6k` (about 780 credits).
- **`content/` is stale for `PHRASES` and `AUDIO`** since this batch: the export tool needs
  Playwright, which isn't installed on this machine.
- **Tone pairs (2026-11-10, `renderTonePairSay`, Speak mode `tpairs`).** Pick one of the 16
  `TPAIRS` words, record it, and see your pitch line over every native speaker's (main voice
  plus the `AUDIO_V` voices), each syllable in its own half of the chart, with the textbook
  shape behind (adjusted for the tone changes: 3+3, low third tone, short first fall in 4+4).
  The score is `pitchMatch` on the whole word against the **closest** native speaker.
  Measured by playing each speaker against the others: the right word reaches 85% in 56 of
  61 tries; a word with a different tone pattern averages 49% and reaches 85% about one time
  in seven. So the wording stays "guide, not grade". Under 85% it names the syllable where
  your line is furthest from that speaker's. The best score per word is kept in
  `localStorage['ipa:tpBest']` (a ✓ at 85%); it is not synced.
  **Tried and dropped:** grading each syllable on its own (native speakers differ too much
  syllable by syllable, and short or creaky syllables give no reading). **Trap found:**
  `cleanPitch` was written for single syllables and throws away the second syllable when the
  pitch leaps between them; two-syllable work must use `tpClean`. Pitch still jumps an
  octave on some creaky third tones, which is why no per-syllable verdict is given.
- **`中国` re-recorded (2026-11-10)** as a sprite in `audio/p_c7_zg.mp3` (Alina, `eleven_v4`,
  ElevenLabs flow `wnI3VLzaXS38Blj9WZeC`, 48 credits, eight takes). The old main clip scored
  1% against the other three speakers in Tone pairs and its 国 did not rise; all eight new
  takes scored 88–98%, and the one kept scores 95% with a clear rise on 国. The four
  speakers now score 95–98% against each other. The old whole-file clip is still in
  `audio/` but unused. Not yet heard by a person.
- **15 rule-lesson phrases (2026-11-10).** Five per language: `es4d`, `es4e`, `es5b`,
  `es5c`, `es10d`; `zh9c`, `zh9d`, `zh10d`, `zh10e`, `zh11c`; `ar8c`, `ar8d`, `ar9c`,
  `ar9d`, `ar11c`. Unlike the `x` phrases they carry a `lesson`, so they join that lesson's
  shadowing step as well as Speak → Phrases. One recording per language
  (`audio/p_c6_<lang>.mp3`, `eleven_v4`, two takes each, 462 credits; ElevenLabs flows
  `KyPkSPkz949cmKBcc0hp` es, `GeHgZSQAJlBzpYh1MbLo` zh, `mirI1HsMiiWfGDjCteUm` ar). The
  Spanish take was chosen because the trill check finds three flicks in both `carro rojo`
  and `Enrique`; the Mandarin take shows the expected rises and falls on 你, 很, 不 and 一.
  Arabic could not be measured. IPA unreviewed, audio not yet heard by a person.
- **Mix-up drill (2026-11-10, item 17).** Sits at the top of Across languages (`MIXUPS`,
  `renderMix`, `mixQ`, `nextMix`, in `#mixup`). Five groups of three choices: r (ɾ / r / ɻ),
  t (t / tʰ / tˤ), p and b (p / pʰ / b), h (h / x / ħ), sh (ʃ / ʂ / ɕ). A question plays a
  hidden word and asks which sound it has; choices stay in a fixed order. It reuses
  `customQ` / `mountQ` and existing clips only, so it cost no credits. Answers are saved in
  progress as `x:<group>:<choice>` and steer the next round toward the choices missed most.
  They are **not** in the daily review. The clips were measured before being listed: the r
  words give 1 flick for ɾ, 2–4 for r, 0 for ɻ; the puffed words 105–160 ms of breath
  against 4–30 ms for the unpuffed. Left out on that evidence: `热` (the trill check counts
  two flicks in it), and `توب` and `تين` from the no-puff choice (the Arabic voice puffs
  them, about 70 ms). Arabic ر is not in the r group because nothing shows whether a given
  clip is a tap or a trill.
- **The player bar hides the word during a listening question** (2026-11-10). Before, the
  bar at the bottom showed the word that was playing, which gave away the answer in Pairs,
  tone questions and the mix-up drill. `showBar` now writes "Word hidden until you answer"
  when the clip belongs to an unanswered question that doesn't already show the word.
- **Own recordings stay on the device** in IndexedDB (`sa-rec`): the first take of each word
  plus the latest from each month. They are not synced (too big for the Firestore document).

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
