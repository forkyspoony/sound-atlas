# Audit: Sound Atlas Spanish guided course

Date: 2026-11-21. Scope: the 23 Spanish lessons (e01–e23, 3 units, 186 words and phrases),
read step by step from the live `index.html` (not the older `content/` snapshot). Benchmark:
Migaku "Spanish Fundamentals: Mexico" (see `migaku-spanish-fundamentals.md`).

Each finding has an id (A1, B2 …) so we can fix them one by one.

**Status (2026-11-21):** quick text fixes done: A1–A6, C3, C4, D4, D5, D8. For A5, the soft d
card now says "approximant" and the β and ɣ lesson text no longer says "buzz/friction". The ɣ
card keeps "fricative" because it is shared with Arabic غ, which really is one; the e09 text
now explains the difference. B1 done: sound cards can tag a how step or note with a language
(`howL`, `noteL` in `S`), and lessons show only untagged lines plus their own language (and only
their own language's examples). The Sounds tab still shows everything. C5 and C6 done: diphthongs (e18) now come before stress
(e17), and spelling to sound (e20) closes the Consonants unit. Progress is saved by lesson id, so
finished lessons stay finished. Step 4 done (text and quizzes only, no new audio): D1/F5 light l
feel step, D2 soft g route via soft d plus an [x]/[ɣ] question in e15, D3 tap fallback, D6, E1
strong vowels, E2 final y (with E5 Uruguay), E3 accent pairs, E4 syllable splitting. The new example
words (leo, poeta, hoy, tu, si…) have no recordings yet; add them in step 5. Still open: C1, C2,
D7, E6–E8, F1–F4, F6.

## Verdict

The course is in good shape and in several ways better than Migaku. Every lesson has
listening, IPA reading and writing, and speaking practice, while Migaku's lessons are reading
only. The IPA is accurate. An automated check of all 186 words and phrases against the
course's own rules (stress, hard/soft b d g, tap/trill, dental t) found **no errors**, and
every example has audio.

The weak points are elsewhere:
1. A few **statements contradict each other** or point to the wrong lesson.
2. **Sound cards show Arabic and Mandarin notes** in the middle of Spanish lessons.
3. Some symbols are **used before they're taught**, and two lessons are in an awkward order.
4. Some explanations say *what* a sound is but not *how to make it*. Light l and soft g are
   the clearest cases.
5. **Example sets are thin** in places: several comparisons have 1 row, several pair drills
   have 2 pairs, and the most useful pair drill for an English speaker (soft d vs tap) is
   missing.
6. **Coverage gaps** next to Migaku: vowel pairs that stay in two syllables (le-o), y at the
   end of a word (muy, rey), written accents on one-syllable words (tú/tu), syllable
   splitting, and three-vowel groups.

---

## A. Errors and contradictions (fix first)

| Id | Where | Problem | Fix |
|---|---|---|---|
| A1 | e07, e09, e23 | Text says "lesson 10", "lesson 15", "lesson 19", but the app numbers lessons **within each unit**: e10 shows as *Consonants · lesson 7*, e15 as *lesson 12*, e19 as *Words and sentences · lesson 3*. A learner looking for "lesson 15" won't find it. | Refer to lessons by title ("the jota lesson", "Rule: hard or soft?"), or make them links. |
| A2 | e11, listen note | "After a consonant (gracias, tres) … the r is also a tap." The next lesson (e12) says r after **n, l, s** is a trill. | "After most consonants (b, d, f, g, k, p, t) …". e22 already says it correctly. |
| A3 | e13, pair tip (es-n) | Tip says ñ "sounds like n with a y glued to it". The lesson's main point is that it is **one** sound, not n + y. | "One contact, made with the middle of the tongue, not the tip." |
| A4 | e14, text | "After n or l, **or when stressed**, it can go further, toward the j of 'jam'." Being stressed isn't what triggers it. The usual triggers are after a pause, after n or l, and when emphatic (Migaku says the same: yo, el yate, inyecta). | "At the start of a phrase or after n or l (yo, el yate, cónyuge) …" |
| A5 | e07 / e08 / e09 cards vs e09 text | The three soft sounds are labelled differently: β "approximant", ð "approximant/fricative", ɣ "voiced velar **fricative**". The e09 quiz calls all three "approximants". e07 and e09 describe "buzz"/"friction", which pushes learners toward a hissy sound. | Use one label for all three ("approximant: the mouth almost closes, with little or no hiss") and drop "buzz/friction" from the β and ɣ text. Optionally say once that some dictionaries write [β̞ ð̞ ɣ̞]. |
| A6 | e01, text | "Every symbol stands for exactly one sound, always, in every language." e05 itself says dictionaries write Spanish dental t as plain [t]. This overclaims. | "Each symbol stands for one sound, and it means roughly the same thing in every language." |

## B. Shared sound cards bring in other languages

The `sound` step reuses the global sound card (`stepHTMLSound`). It filters examples only to
put the lesson's language first, then shows up to 3. It shows **all** "how" steps and the
note unfiltered. In Spanish lessons the learner sees:

| Card (lesson) | Off-topic content |
|---|---|
| a (e02) | How step 2: Arabic [a] near emphatics, long [aː] |
| e (e02) | Note: Levantine [eː], ة |
| p (e04) | How step 3: Mandarin 大 dà, 哥 gē. Note: pinyin b d g |
| t̪ (e05) | "Spanish **and Arabic** d" |
| ð (e08) | Note: Levantine ذ |
| ɣ (e09) | How step 3: Arabic غ |
| r (e12) | Note: Levantine ر. Third example is Arabic راس |
| x (e15) | Anchor: "All three of your languages use it". How step 3 and note are about Mandarin and Arabic |

**B1.** Tag each how step and note with a language (or move cross-language remarks to the
Across tab), and show only the lesson's language inside lessons. The Sounds tab can keep
showing everything.

## C. Order: symbols and ideas used before they're taught

| Id | Where | Problem |
|---|---|---|
| C1 | e03 quiz | Asks the learner to read [ˈkuβa]. β isn't taught until e07. |
| C2 | e09 | Soft g is explained as "the voiced partner of the jota", which comes 6 lessons later. It explains an unknown sound with another unknown sound. The quiz also uses agua [ˈaɣwa] with a [w] glide, taught in e18. |
| C3 | e06 listen "[k] spelled three ways" | Includes **cinco** [ˈsiŋko]: its first c is [s] (taught in e16) and its n is [ŋ] (e10). With no note, it muddies a lesson about k. Swap for *cosa* or *quince*, or add a note. |
| C4 | e01, e03 | [ʧ] (in chocolate) appears long before e16. It's shown, not tested, so this is minor. A one-line gloss would help. |
| C5 | e17 before e18 | The stress lesson counts syllables in ciu-DAD and can-CIÓN, but the next lesson is the one that explains that i/u + vowel make **one** syllable. Move e18 (diphthongs) before e17, or open e17 with a short "how to count syllables" step. |
| C6 | e20 position | "Spelling to sound, the whole system" comes after intonation (e23) in the Words unit. Its content (c/z/qu/gu/g/h/x/ll) is all consonant spelling. It fits better as the last consonant lesson, right after e16, or as a summary before e21. |

## D. Explanation clarity: where the "how" is missing or thin

| Id | Lesson | Gap |
|---|---|---|
| D1 | e16 light l | Says Spanish l is "bright" and English final l is "dark", but never says **what to do**: tongue tip on the gum ridge, back of the tongue kept low, no rounding. There's no feel step either, and dark l is one of the most persistent accent markers. Migaku gives the placement. Add a feel step: say "lee", hold the l, then put it at the end of *sol* without letting the back of the tongue rise. |
| D2 | e09 soft g | Its feel step leans on "a-ha" and yawning. Better route: start from the soft d and soft b you just learned and say "it's the same move at the back" (aga → a-ɣa), then contrast it with the jota once e15 is done. Also add [ɣ] vs [x] (*lago* vs *lajo*) later, in e15. |
| D3 | e11 tap | Every route goes through American English (butter, water, ladder, "a lot of"). For anyone who doesn't tap their t's, there's no way in. Add a fallback: a very quick "d" with the tongue tip (*para* ≈ "pada" said fast), or "pot o' tea" said quickly. |
| D4 | e14 [ʝ] vs [j] | The lesson introduces both symbols but never gives the rule for which one a spelling gets: **i before a vowel = [j]** (tierra, bien), **y / ll / hi- at the start of a syllable = [ʝ]** (yo, calle, hielo). Without it, the "hielo is [ʝ] but tierra is [j]" contrast looks arbitrary. |
| D5 | e10 n assimilation | Covers n → [m] and [ŋ] but skips n → [ɱ] before f (*enfermo*) and n → [ɲ] before ch/y/ll (*cónyuge*, *ancho*). It's labelled "Bonus", so this is fine to keep short, but say "and it shifts before f and ch too" with one example each. |
| D6 | e18 | "That's the only place Spanish has glides" ignores word-final **y** (muy, rey, hoy, soy), which is a glide [j] and is spelled y, not i. See E2. |
| D7 | e23 intonation | Five steps and no practice beyond listen and speak. Only three sentences carry the whole idea. The app already has a live pitch line (Mandarin tone coach); reusing it for "statement falls / yes-no question rises" would make this lesson real practice. |
| D8 | e02 vowel e | The lesson gives two pictures of Spanish e: "start of 'say', frozen" (lesson) and "halfway between 'eh' and 'ay'" (pair tip). Both are fine. Pick one so the anchor stays fixed. |

## E. Coverage gaps compared with Migaku

Ranked by how much they matter for an English speaker reading and speaking Latin American
Spanish:

| Id | Topic | Why it matters | Suggested home |
|---|---|---|---|
| E1 | **Two strong vowels stay in two syllables** (a, e, o: le-o, po-e-ta, te-a-tro, cre-o) | English speakers glide them: "real" said like [rjal], "teatro" like [tja-]. It's also needed to count syllables for stress (e17). Migaku calls these strong and weak vowels. | e18 |
| E2 | **y at the end of a word is a vowel** (muy, rey, hoy, soy, y "and" = [i]) | Learners carry over the consonant [ʝ] from e14 and say "mu-zhy". It isn't mentioned anywhere. | e14 or e18 |
| E3 | **Written accents that tell words apart**: tú/tu, sí/si, él/el, más/mas, and question words qué/que, cómo/como, dónde/donde | They appear in quizzes already (sí vs sé) without the rule. Short and high value for reading. | e17 |
| E4 | **Syllable splitting** (single consonant goes with the next vowel: ca-sa; two consonants split: car-ta; but pr/bl etc. stay together: o-tro) | Needed for stress, linking and the build exercises. e22 covers the clusters only. | e17 or e22 |
| E5 | Three-vowel groups (buey, Uruguay, miau, estudiáis) | Rare. One line and one example in e18 is enough. | e18 |
| E6 | Loanword quirks: j in jet [ʝ], h in hámster [x], w in wifi [w], and x as [s] in Mexican names (Xochimilco) | Low priority. A short note in e20. | e20 |
| E7 | Weakened consonants at the end of a syllable (acción with [ks] or [ɣs], examen [ks], ritmo with [ð]) | Mostly for listening. Fine to skip or add as a note. | e22 |
| E8 | Linking: same-consonant merging (con nosotros, los sábados) and soft consonants across words (la vaca [β]) | e10 shows mi dedo and e19 shows los otros. One more example each would complete it. | e19 |

Topics Migaku covers that I'd **leave out**: punctuation (¿¡ is already mentioned; em-dash
dialogue isn't pronunciation), alphabet letter names, the history of Spanish, and Nahuatl tl/tz
(Mexico-specific).

## F. Examples and practice

| Id | Finding | Fix |
|---|---|---|
| F1 | **Missing pair drill: soft d [ð] vs tap [ɾ]** (cada/cara, todo/toro, codo/coro, lodo/loro, mida/mira). e08 explains this trap well (lado said with an American dd sounds like laro), but there's no drill to train the ear. | New pair set, used in e08 and e11. Needs ~10 new recordings. |
| F2 | Several pair sets have only **2 pairs** (e/i, t/d, k/g, n/ñ), so the adaptive drill repeats quickly. | Add 2–3 pairs each, e.g. e/i: *queso/quiso*, *pena/pina*; t/d: *toma/doma*, *tomar/domar*; k/g: *cota/gota*, *casto/gasto*; n/ñ: *mono/moño*, *pena/peña*. (Check each is a real, common word before recording.) |
| F3 | No o/u pair, though English speakers often blur unstressed o and u. | Optional set: *modo/mudo*, *loto/luto*, *poso/puso*. |
| F4 | Comparisons with a single row: e02 see/sí, e03 two/tú, e14 yes/yo. One example doesn't show a pattern. | Add a second row each, e.g. *me/mi* vs "me", *su/sue*; *yeso*, *ya*. |
| F5 | e16 has no feel step and no speaking check aimed at dark l (D1). Its speaking words *sol, mil, animal* are good, so keep them. | Add a feel step. |
| F6 | The checkpoint (e21) tests sounds and pairs but **none of the rule lessons**: stress, diphthongs, linking, spelling. | Add 4–5 rule questions (stress position, how many syllables, silent u, c before e/i). |

## G. What's working well (keep)

- Every sound lesson follows the same arc: explain the English habit → feel it → hear it →
  read IPA → write IPA → say it. This is more active than Migaku.
- The traps are named precisely: the American dd/tt tap turning lado into laro (e08), the
  English schwa (e03), aspiration and the voicing explanation for p/b (e04), and the "IPA [r]
  is not English r" warning (e12). Migaku has none of the first and fourth.
- e10 (hard or soft?) explains **why** the rule works (the mouth is already closed after m/n),
  which makes it stick. The best rule lesson in the course.
- The feel steps' "No" branches give a real second route, not just "try again".
- IPA accuracy and audio coverage: no problems found (see Method).

## H. Per-lesson summary

| Lesson | Rating | Main notes |
|---|---|---|
| e01 How IPA works | Good | A6 overclaim; C4 |
| e02 Vowels a e i | Good | B (Arabic on the a/e cards); F2, F4; D8 |
| e03 Vowels o u, schwa | Good | C1 β too early; F4 |
| e04 The puff: p | Very good | B (Mandarin on the p card) |
| e05 t and d on the teeth | Very good | B (Arabic mention); F2 |
| e06 k and g | Good | C3 cinco; F2 |
| e07 Soft b | Good | A1, A5 |
| e08 Soft d | Very good | B; F1 needs the ð/ɾ drill |
| e09 Soft g | Fair | A1, A5, C2, D2, B |
| e10 Rule: hard or soft? | Very good | D5 |
| e11 Tap | Good | A2, D3 |
| e12 Trill | Very good | B (Arabic example on the card) |
| e13 ñ | Good | A3; F2 |
| e14 y and ll | Fair | A4, D4, E2; F4 |
| e15 Jota | Good | B; add a ɣ/x contrast (D2) |
| e16 Sounds you already have | Fair | D1 light l has no "how", F5 |
| e17 Stress and accents | Good | C5 order; E3, E4 |
| e18 Diphthongs | Fair | D6, E1, E2, E5 |
| e19 Linking and rhythm | Good | E8 |
| e22 Clusters | Very good | E7 optional |
| e23 Intonation | Fair | D7 thin, no pitch practice |
| e20 Spelling to sound | Good | C6 position; E6 |
| e21 Checkpoint | Good | F6 no rule questions |

## I. Suggested order of work

1. **Quick text fixes** (one commit, no new audio): A1–A6, C3, C4, D4, D5, D8.
2. **Hide other languages on sound cards in lessons** (B1). A code change in `stepHTMLSound`
   plus language tags on the how/note lines.
3. **Reorder** e18 before e17 and move e20 to the end of the Consonants unit (C5, C6). Check
   that the SRS keys and "lessons done" still line up.
4. **New explanation steps**: light l feel step (D1), soft g route (D2), tap fallback (D3),
   strong vowels (E1), final y (E2), accent pairs (E3), syllable splitting (E4).
5. **New audio and drills**: ð/ɾ pair set (F1), extra pairs (F2, F3), extra comparison rows
   (F4), rule questions in the checkpoint (F6).
6. **Intonation practice** with the pitch line (D7). This is the biggest single piece of work.

## Method

- Exported the current content from `index.html` with `tools/extract_content.py` (the
  committed `content/*.json` snapshot is out of date: UNITS, LW, S, PAIRS and PHRASES all
  differ, so regenerate it before relying on it).
- Read every step of every Spanish lesson, with the sound cards, pair sets and word IPA
  filled in.
- Automated check of every Spanish word and phrase a lesson uses (186 items): audio exists;
  multi-syllable words have a stress mark in the place the spelling rules predict; b/d/g are
  hard only after a pause, m/n (and l for d) and soft otherwise; t carries the dental mark; tap
  vs trill follows the spelling; each build answer matches the IPA shown. **0 issues.**
- Not checked: how the audio itself sounds (voice quality), and the Mandarin and Arabic
  courses.
