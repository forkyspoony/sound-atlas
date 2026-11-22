# Study notes: Migaku "Spanish Fundamentals: Mexico"

Prepared 2026-11-21 as a benchmark for auditing the Sound Atlas guided courses.
Source: the user's own backup at `Downloads/Migaku_Backup_Windows (1)/Migaku_Backup/course-backups/20261107-151133/`
(`course.json`, 184 items, all exported; one SVG icon not archived). Notes are summaries, not copies.

## 1. Shape of the course

- **184 items = 52 lessons + 132 flashcards**, in a fixed order. Cards sit right after the
  lesson they test (cards carry `relatedLessonId`).
- **5 chapters**: Introduction (6 lessons) → Vowels (7) → Consonants (28) → Orthography (4) →
  Advanced Sound Info (6) → Outro (1).
- Roughly one lesson per letter or spelling pattern, organised by **spelling**, not by sound:
  "CA, QUE, QUI, CO, CU", "GUA, GÜE, GÜI, GUO", "Z, CE, CI", "W, HUA, HUE, HUI".
- Dialect is pinned: one speaker from southern Baja California; General American English is
  the comparison dialect throughout. Spain audio is used only for Spain-only forms.

### Full outline (lesson → number of cards)

| Ch. | Lessons (cards) |
|---|---|
| Intro | How to use this course · About Spanish · Spanish Dialects · The Alphabet · Letters vs. Sounds (IPA) · Useful Terminology (all 0) |
| Vowels | Intro to Vowels (0) · A, E, I, O, U (1 each) · Semivowels (0) · Multi-vowels (14: every diphthong) |
| Consonants | Intro (0) · L 2 · P 1 · T 2 · D 2 · F 2 · M 2 · N 2 · Ñ 2 · B,V 3 · CA/QUE/QUI/CO/CU 5 · CUA/CUE/CUI/CUO 4 · K 1 · Y 4 · LL 2 · H 4 · CH 1 · S 1 · Z/CE/CI 4 · X 3 · R,RR 4 · GA/GUE/GUI/GO/GU 6 · J/GE/GI 4 · D,B/V,G sound changes 9 · GUA/GÜE/GÜI/GUO 4 · W/HUA/HUE/HUI 4 · Other consonant sound changes 6 |
| Orthography | Syllables · Basic accent rules · Advanced accent rules · Punctuation (all 0) |
| Advanced | Connected Speech 14 · N Sound Changes 4 · Sound Weakening & Omission 0 · L/R Swapping 0 · Foreign Word Pronunciation 6 · Rare Letter Clusters 5 |
| Outro | What's Next? |

## 2. The lesson template (consonant lessons)

Every sound lesson follows the same skeleton, which is its strongest feature:

1. **Overview box**: Near English Equivalent (or "none"), IPA, and for consonants
   Aspiration / Voicing, plus a **Sound Variation** pair: *Letter Sound Changes* (yes/none)
   and *Dialectal Variation* (yes / little to none). For vowels: height, backness, rounding.
2. **Explanation** with a tappable syllable (e.g. "ARA ['a.ɾa]") and 1–3 example words, each
   with audio, IPA, and a gloss.
3. **Common Mistakes**: the specific English habit that breaks it (aspirated p, dark L,
   diphthongised o, long i), usually as an English-vs-Spanish "Compare:" pair.
4. **Special Note** callouts for side facts.
5. **Advanced Content** (collapsed toggle, 25 of 52 lessons): dialect variants, rare
   exceptions, deeper phonetics (e.g. n+rr and s+rr assimilation, assibilated r, vowel
   allophones in Spain).

Intro/orthography lessons are prose + tables + example words with audio; no exercises.

## 3. The flashcards

- **One card type** (`typeId 2`), self-graded. Front: the word with the target letters
  bold-underlined (e.g. pe**r**o). Back: IPA, syllable breakdown with the stressed syllable,
  near-English equivalent, definition, and a **native-speaker face video** that says the word
  and then the isolated pattern (e.g. "pero … ARA"). 132 videos, one per card.
- Stated goal: check that you can recall **how a spelling sounds**, not what it means. Rare
  words are used on purpose to cover every letter combination. "Roughly right" is a pass.
- So the card skill is **reading aloud from spelling** (spelling → sound), graded by the
  learner against video. There is no listening discrimination, no IPA writing, no
  production check, and no minimal pairs anywhere in the course.

## 4. What it teaches that matters for an audit

Facts and rules the course treats as core (useful as a coverage checklist):

- Letters ≠ sounds; IPA as a "warning light" against English spelling habits. IPA is
  optional for the learner.
- Five pure vowels, short, no reduction to schwa, no off-glide (no/yo, sí vs sea, tu vs too).
- Semivowels [j] [w]; Y = I; full diphthong table (I-, U-, UI/IU groups); triphthongs
  incl. Spain-only ones; strong (a e o) vs weak (i u) vowels.
- Consonants: unaspirated p t k; dental t d; light L (tongue on the gum ridge); B = V;
  c/qu/k and g/gu/gü spelling families; silent H, but hie-/hia- = [j] and hua/hue/hui = [w];
  seseo for z/ce/ci; X as [ks]/[s]/[x] (México, Texas, Oaxaca); y/ll as [ʝ] vs [ɟʝ] after
  pause, l, n.
- R: trill at word start, after l n s z, and rr; tap between vowels and after b d p t k g f;
  emphatic final trill; perro/pero, carro/caro; "pot o' tea" ≈ para ti as a tap bridge.
- Approximants: d b g → [ð̞ β̞ ɣ̞] everywhere except after pause / after n (and l for d);
  final d weak or dropped in Mexico.
- Other changes: s → [z] before voiced consonants (desde, jazmín), coda d/c/p weakening
  (ritmo, anécdota, acción, optimista); n assimilates to m ɱ ɲ ŋ.
- Orthography: syllable division (3 consonant rules + vowel rules), stress/accent rules
  (regular = ends in vowel/n/s → penultimate), accent on the strong vowel, accented weak vowel
  breaks the diphthong (continuo/continuó/continúo, venia/venía), diacritic pairs (tu/tú…),
  question words; ¿¡, lowercase days/languages, em-dash dialogue.
- Connected speech: same-vowel and same-consonant merging, resyllabification
  (el oso → e.lo.so), approximants across word boundaries (la vaca [β̞]), n assimilation across
  words (envió un paquete [m]).
- Dialect awareness, explicitly "not Mexico, skim it": s aspiration/elision, d and r loss,
  lambdacism (Caribbean), rhotacism (Andalusia).
- Loanwords: j → [ʝ] (jet), h → [x] (hámster), Nahuatl tl and tz.

## 5. Where it is strong vs. Sound Atlas (things to borrow or check against)

- **Consistent overview box** on every sound, including "Letter Sound Changes" and
  "Dialectal Variation" flags. Sound Atlas lessons have no fixed at-a-glance header.
- **Spelling-first coverage**: every spelling pattern gets a lesson and a card, including
  rare ones (güe, cuo, hie-, tl, ps/mn/gn). Good checklist for gaps.
- **"Common Mistakes" framed as the exact English habit**, always with an English vs Spanish
  pair. Sound Atlas has `cmp` steps; check each lesson has one aimed at the real error.
- **Advanced Content toggle**: keeps lessons short while holding dialect and edge cases.
- **Video of a face** for every card word (lips/jaw visible). Sound Atlas uses Seeing Speech
  diagrams/MRI on sound cards, not a speaker's face per word.
- **Orthography as its own chapter** (syllables, two accent lessons, punctuation).

## 6. Where Sound Atlas already goes further

- Active practice inside lessons: listening (`listen`, `pairs`), IPA writing (`build`),
  recording and comparing (`speak`, `shadow`), rule questions (`ruleq`). Migaku lessons are
  read-only and its cards are self-graded.
- Minimal pairs, adaptive drills, puff meter, trill check, vowel coach: none of these exist
  in Migaku.
- SRS mixes sounds, pairs, rules and build items; Migaku reviews only spelling→sound cards.
- Intonation (e23) and consonant clusters (e22) have their own lessons; Migaku has neither.

## 7. Coverage checklist for the Spanish audit

A rough keyword scan of `content/UNITS.json` (es lessons e01–e23) gave these
starting points. **Unverified: a keyword hit is not proof a topic is taught well.** Check each
during the audit.

| Migaku topic | Likely in Sound Atlas? | Check |
|---|---|---|
| Strong vs weak vowels, hiatus, accented weak vowel breaking a diphthong (venía) | **No hits** | e17/e18 |
| Triphthongs (miau, buey, Uruguay) | **No hits** | e18 |
| L/R swapping, s/d/r weakening by region | No lambdacism hits; some dialect notes in e14–e16, e20 | decide if in scope (SA teaches general Latin American) |
| Loanword j/h/x (jet, hámster, México) | Weak (e06 "foreign"; México in e15/e20?) | e15, e20 |
| Rare clusters ps/mn/gn, Nahuatl tl/tz | Unclear (keyword "tl" too noisy) | grep words |
| s → [z] before voiced consonant (desde, mismo) | Not scanned | e16, e19 |
| Coda c/p/d weakening (acción, ritmo, optimista) | Not scanned | e22? |
| y/ll [ʝ] vs [ɟʝ] after pause/n/l | e14 | e14 |
| gue/gui vs güe/güi, cua/cue spelling families | e06, e20 | e20 |
| Silent h, hie-/hue- glides | e16, e20 | e20 |
| n assimilation m/ɱ/ɲ/ŋ incl. across words | e10, e13 | e13, e19 |
| Stress + accent rules, diacritic pairs, question words | e17 | e17 |
| Syllable division rules | Mentioned widely, no dedicated rule set | e17 |
| Punctuation ¿¡, em-dash dialogue, lowercase days | Partial (¿ appears in e19, e23) | likely out of scope |
| Connected speech: vowel merging, resyllabification, linking approximants | e19 | e19 |
| Dark L warning, light L placement | e16, e17 | e16 |
| Unaspirated p t k, dental t d | e04–e06 | done |
| Vowel glide / no schwa / short i, u | e02–e03 | done |

## 8. Notes on the backup itself

- `course.json` holds each lesson as compiled MDX (`data.content`) plus a rendered HTML copy;
  the rendered copy **omits Advanced Content**, so read that from the MDX.
- Card back details are in `data.extraInfo` (MDX); videos at `data.video.src` with labelled
  time sections. Local copies: `course-backups/media-cache/` (132 mp4, 7 images). Lesson
  tap-audio clips do not appear to be in the media cache.
- Migaku content is copyrighted: use it to benchmark coverage and structure, not to copy text,
  audio or video into Sound Atlas.
