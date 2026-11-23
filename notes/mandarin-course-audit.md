# Audit: Sound Atlas Mandarin guided course

Date: 2026-11-22. Scope: the 24 Mandarin lessons (m01–m24, 4 parts, 134 Mandarin words and
phrases plus 16 English comparison words), read step by step from the live `index.html`. Also
checked: the 16 sound cards as a lesson shows them, the 22 Mandarin shadowing phrases, the tone
quizzes (`toneQ`, `tpairQ`), and the pitch of every one-syllable clip. There is no Migaku Mandarin
course in the backup, so the benchmark is the standard descriptions of Beijing Mandarin (Duanmu,
*The Phonology of Standard Chinese*; Lin, *The Sounds of Chinese*).

Each finding has an id (A1, B2 …) so we can fix them one by one, as with the Spanish audit.

**Status (2026-11-22):** G done: all six clips re-recorded (see the note under the G table).
Step 4 done: E1 (m16 "Longer glide finals" step; m18 "The uan and un trap" step and two questions),
E2 (m22 "The er syllable" step), E3 (o list in m12), E4 (plain ou words in m15), E5 + D1 (m19 neutral
list; m22 now splits "lower after 1, 2, 4" and "higher after 3"), D2 (m19 list 再见 再次 大概), D7 (one
line on -ng erhua, text only), F1 + F3 + F4 + F5 (more pairs), F2 (new `zh-iy` set, drilled in m13 and
m24). 50 new clips, best of three takes each, in `audio/p_g3*_zh.mp3`. 快 falls from 356 to 165 Hz but
the checker loses the middle of the glide in every take (nine tried), so it is kept unverified. 空儿 came
out level then falling (probably kōngr) and isn't used. Not yet heard by a person. Step 5 done
(2026-11-22): D4, the tone coach now runs inside m02 (tones 1 and 4), m03 (tones 2 and 3), m04 (all
four) and m19 (tone pairs, ten words), as step types `tcoach`/`tpcoach`. Left (all optional): D9, C3, F8.
 C1/F7 (new `zh-bdg` set for m05: 爸/怕, 大/踏, 哥/科, 白/牌, 读/图, 古/苦; 白/牌 replaces
不/铺 because 铺 has two readings; `zh-asp` now has all eight pairs, is drilled in m11 and m24, and
lists all six puff sounds as its ids, so review brings it in only after z/c, zh/ch and j/q), F6 + D3
(new `zh-t23` set and a "Tone 2 or tone 3?" step in m03), E6 (seven rule questions in m24; `pu`
and `x` added to the m24 sound quiz). New clips: 白 牌 读 图 古 苦 雨 in `audio/p_g2_zh.mp3`.
Quick fixes done: A1–A7, C2, D1 (text only; the listen step needs new
clips, see E5), D2 (text only), D5, D6, D8. For A1, `TPAIRS` entries can now carry the written
tones as well as the said ones (`wr`); the quiz grades what is heard and the feedback names both,
and the Tones tab grid and the Speak chips still sort by the written tones. A3 also updated the
zh/ch/sh cards, the "retroflex" hover tip, the symbol hints and the pair tips. B1 is left for the
audio step, because it needs new p-word clips.

## Verdict

The course is solid. The order (tones → consonants → vowels → tones in speech) is sensible, every
lesson has listening, reading, writing and speaking, and every word has audio. I read all 134
transcriptions by hand against the pinyin: they are consistent and use the course's own
conventions correctly (half third tone ˨˩, 3+3 sandhi written as ˧˥, 不/一 changes written as
said, neutral syllables with no tone letter). One small inconsistency (A5). The sound cards are
already clean: the language filter added for Spanish (B1) hides the Spanish and Arabic lines.

The weak points:
1. **One quiz marks right answers wrong:** the tone-pair quiz wants "3 + 3" for 你好, but the
   recording (correctly) says ní hǎo, 2 + 3.
2. **A few explanations are inaccurate or contradict each other:** the [ɤ] recipe, how far to curl
   the tongue for zh/ch/sh, and "questions are made with words, not pitch".
3. **Tones in combination are under-taught:** neutral tone pitch after tone 3, 4 + 4, and a direct
   tone 2 vs tone 3 drill, which is the hardest pair for most learners, are missing.
4. **Missing finals:** iao, iang, uai, uan, uang, üan, ün and the er syllable (二, 儿) are never
   taught. üan is a classic trap (全 quán is "chüen", not "chwan").
5. **Thin pair drills:** u/ü has 2 pairs; four other sets have 3; i/ü, c/ch and tone 2/3 have none.
6. **Some clips may have the wrong tone.** A pitch check flags 6 clips to listen to (G).

---

## A. Errors and contradictions (fix first)

| Id | Where | Problem | Fix |
|---|---|---|---|
| A1 | `tpairQ` (m19, m24 tone-pair quiz) | TPAIRS lists 你好 as `[3,3]`. The clip and the IPA say [ni˧˥ xaʊ˨˩˦], 2 + 3. The wrong answers are picked to share one tone with the right one, so "2 + 3" is often offered. A learner who hears it correctly is marked wrong, and the feedback then says "tone 3 + tone 3" next to IPA showing ˧˥. | Grade what is heard: store `[2,3]` and show "written nǐ hǎo (3 + 3), said ní hǎo" in the feedback. Or swap 你好 for a 3+3 word and explain sandhi in the feedback. Same check for any future 3+3 or 不/一 word. |
| A2 | m12 [ɤ] card vs feel step and quiz | The card says "Say **oh** and unround". The feel step and the quiz answer say "Say **oo** and unround". Unrounding "oo" gives [ɯ], which is too high. [ɤ] is unrounded "oh" (mid). | Use "oh" everywhere ("a pure oh with no glide, then spread the lips"), and say "if it sounds like oo with a smile, open your mouth a little". Fix the quiz answer text. |
| A3 | m08 text, feel step, tsr/sr cards | "Curls up and back … until it points up at the hard palate." Mandarin zh/ch/sh are made with the tip *raised* to just behind the gum ridge. They are not curled far back like Hindi or Tamil retroflexes. Over-curling makes a dark, heavy accent, and it is the usual learner mistake. | "Raise the tip to the area just behind the gum ridge; don't curl it back. The tongue body stays flat and the lips stay relaxed." In the feel step, stop at the ridge, not the hard palate. |
| A4 | m23 text and quiz | "Questions are made with words, not pitch." Mostly true, but a statement can be a question with a raised pitch (你是老师？), and the end of a sentence is pitched higher in questions. The tones keep their shapes. | "Mostly with words: 吗, question words (什么, 哪儿) or A-not-A (是不是). You can also ask by saying a statement on a higher pitch, but each tone keeps its own shape; don't add an English swoop." Add 是不是 to the list. |
| A5 | m21, 一个 | Written [i˧˥ kɤ]. In other words, neutral e is [ə]: 的 [tə], 么 [mə], 了 [lə]. | [i˧˥ kə]. |
| A6 | m22 quiz (妈妈) | The answer "short, light and a **little lower**" is given as the general rule. After tone 3 the neutral syllable is **higher** (see D1). | Keep the answer for 妈妈, but phrase the "why" as "after tone 1 …". Add a question with 你们 or 姐姐. |
| A7 | m01 step 2 | "A final: a vowel, possibly with a glide before it or -n / -ng after it." This leaves out ai, ei, ao, ou, which end in a glide. | "… or with -i, -o/-u, -n or -ng after it." |

## B. Sound cards

The language filter works: no Spanish or Arabic lines show in a Mandarin lesson. The only stray
text is the "close-mid" hover tip on [ɤ], which mentions Spanish e and o. That's harmless.

| Id | Where | Problem |
|---|---|---|
| B1 | m05, p and pʰ cards | The /p/ card lists 大 dà [t], and the /pʰ/ card lists 他 [tʰ] and 开 [kʰ]. The how step explains it ("d and g work the same way"), but a /p/ card should show p words first: 爸, 不, 白; 怕, 跑, 朋. Either order the examples p first or retitle the cards "no puff (b d g)" / "puff (p t k)". |
| B2 | m06, x card | Only one Mandarin example (好). Add 喝 and 红 (both already have audio). |

## C. Order: things used before they're taught

| Id | Where | Problem |
|---|---|---|
| C1 | m05 pair set `zh-asp` | It includes 在/菜, 知/吃 and 鸡/七, but z/c, zh/ch and j/q are taught in m07–m10. Use a b/p, d/t, g/k-only set in m05 (add 不/铺, 读/图, 古/苦), and keep the full set for m11 and m24. |
| C2 | m19 before m20 | The tone-pair lesson plays 你好 and 很好 as "tone 3 first" and quizzes them (A1), but the 3 + 3 rule comes in the next lesson. Either move m20 before m19, or open m19 with one line: "你好 is written 3 + 3 but said 2 + 3; the next lesson explains why." |
| C3 | m05, m06, m09, m11 builds | [ɤ] (哥, 喝, 热), [əŋ] (冷) and [y] (去) are built before their lessons (m12, m15, m13). The "why" lines explain them, so this is minor. Optionally swap in words whose vowels are already taught (哥 → 古 gǔ, 喝 → 好, 冷 → 来, 去 → 七). |

## D. Explanation clarity: where the "how" is missing or thin

| Id | Lesson | Gap |
|---|---|---|
| D1 | m04, m22 neutral tone | "Its pitch follows the syllable before" is right but doesn't say how. After tones 1, 2 and 4, the neutral syllable is lower (妈妈, 朋友, 谢谢). After tone 3 it is **higher**, because tone 3 stays low and the neutral syllable bounces up (你们, 我的, 姐姐). A learner who makes every neutral tone low will get the tone-3 cases wrong. Add the rule and a listen step for the four cases. |
| D2 | m19, m23 tone 4 + tone 4 | The first of two falling tones only falls halfway (53): 再见, 再次, 大概. The m19 build says "Two falling tones" with no hint, so learners make two full chops. Add one line and a listen step. |
| D3 | m03, m04 tone 2 vs tone 3 | This is the hardest pair for most learners, and there is no direct contrast. Give a tip ("tone 2 climbs right away from the middle; tone 3 sits low first and rises late, or not at all") and a pair drill (F6). |
| D4 | all speak steps | "Recording opens the Speak tab", so the learner leaves the lesson. The tone coach (live pitch line over the target tone) already exists in Speak. As with the Spanish melody step (D7 there), add an in-lesson tone step: m02–m04 for single tones, and a two-syllable version in m19 if possible. |
| D5 | m05 | Doesn't mention that b, d, g often sound voiced in neutral syllables (哥哥 gēge, 的 de, 了 le). One line stops learners thinking they misheard. |
| D6 | m21 不 and 一 | Doesn't mention that 不 is often neutral inside a phrase (对不起, 听不懂, 是不是), or that 一 is neutral between repeated verbs (看一看). Both appear in the shadowing phrases (zhx2, zhx5) but never in a lesson. |
| D7 | m22 erhua | Covers -n and -i dropping. Doesn't cover -ng (the vowel becomes nasal: 空儿 kòngr) or the er syllable itself (E2). |
| D8 | m06 h | Three different strengths: m01 says it "scrapes", m06 says it is "a bit softer than the Spanish jota", and the card says "gentler, closer to a breathy h". All defensible, but say it once the same way: "a light scrape at the back, softer than Spanish j, never plain breath". |
| D9 | m16/m18 ui, iu (optional) | In tones 1 and 2 the middle vowel is weak (guī sounds closer to [kwi], liú to [ljou]). Learners sometimes over-pronounce it. One optional line. |

## E. Coverage gaps

| Id | Gap | Where it fits |
|---|---|---|
| E1 | **Finals never taught:** iao [jaʊ] 叫, 小; iang [jɑŋ] 想, 两; uai [waɪ] 快; uan [wan] 关, 晚; uang [wɑŋ] 黄; **üan [ɥɛn]** 远, 全, 选 (raised a like ian, and written "uan" after j q x y: a classic trap); **ün [yn]** 云, 军 (only mentioned in brackets in m18); ueng 翁 (rare). | m16 text and listen step, plus m18 "spelling traps" for üan/ün. |
| E2 | **The er syllable:** 儿 ér, 二 èr, 耳 ěr [ɚ] / [aɚ]. 二 (two) is one of the commonest words, and it is the base of erhua. | m14 or m22. |
| E3 | **o** has no listen step: 波 bō [pwo], 我 wǒ, 多 duō, 国 guó. m12 explains o but never plays it. | m12. |
| E4 | **ou** examples are 九 (actually iou) and 朋友 (neutral). Add plain ou: 狗 gǒu, 走 zǒu, 手 shǒu, 口 kǒu. | m15. |
| E5 | **Tone + neutral pairs:** m19 says "practise all 16 pairs" but leaves out the four X + neutral pairs (他们, 朋友, 你们, 谢谢), which are what D1 is about. | m19 listen step. |
| E6 | **The checkpoint doesn't test the rules.** m24 tests sounds and tones, but not 3 + 3, 不, 一, the neutral tone or spelling (iu/ui/un). Add 5–7 rule questions, as in the Spanish F6 fix. The quiz pool also leaves out `pu` and `x`. | m24. |

## F. Example sets are thin

| Id | Set | Now | Add |
|---|---|---|---|
| F1 | `zh-uy` u vs ü | 2 pairs | 炉 lú / 驴 lǘ, 五 wǔ / 雨 yǔ, 无 wú / 鱼 yú |
| F2 | new: i vs ü (learners slide ü to "ee") | none | 你 nǐ / 女 nǚ, 气 qì / 去 qù, 姨 yí / 鱼 yú, 力 lì / 绿 lǜ |
| F3 | `zh-ssh` z c s vs zh ch sh | 3 pairs, no c/ch | 擦 cā / 插 chā, 三 sān / 山 shān, 色 sè / 社 shè |
| F4 | `zh-jzh` j q x vs zh ch sh | 3 pairs | 前 qián / 缠 chán, 家 jiā / 渣 zhā |
| F5 | `zh-nng` -n vs -ng | 3 pairs | 心 xīn / 星 xīng, 分 fēn / 风 fēng, 山 shān / 伤 shāng |
| F6 | new: tone 2 vs tone 3 | none | 麻/马, 糖/躺, 十/使, 肥/匪, 同/统, 鱼/雨 (all but 雨 already have audio) |
| F7 | `zh-asp` for m05 | see C1 | 不 bù / 铺 pù, 读 dú / 图 tú, 古 gǔ / 苦 kǔ |
| F8 | comparisons (cmp) | m07, m09, m15 have 1 row | m07: "cats / pizza" for ts; m09: "rung" vs 让; m15: "now" vs 闹 |

## G. Audio: clips to listen to

ElevenLabs can slip on tones (HANDOFF, known risks). I ran every one-syllable clip (87) through
the app's own pitch tracker and the tone coach's verdict, then looked at the raw pitch line of
anything flagged. Most clips are fine. Many "flags" were only a short noise at the start of the
file, or a tone 3 that falls low without rising (normal). These six don't look like their tone
and need a human ear:

| Clip | Should be | Pitch line shows | Used in |
|---|---|---|---|
| 烫 tàng | 4, falling | a short dip, then rising and level (207 → 246 → 233 Hz) | m04 four-tone set, tone quiz set |
| 志 zhì | 4, falling | a fall, then a rise (333 → 188 → 259 Hz): could sound like zhǐ | `zh-ssh` pair 字/志 |
| 怕 pà | 4, falling | the vowel is level (~240 Hz) | m01, m02, m05, m24: the poster word for aspiration |
| 中 zhōng | 1, level | a voiced fall (315 → 154 Hz) before a level part | m08, m11, m17 |
| 谢 xiè | 4, falling | mostly level (~220–233 Hz) | m10, m16, m18 |
| 菜 cài | 4, falling | the vowel rises slightly (217 → 251 Hz) | m05, m07, m11, m24 |

草 cǎo and 把 bǎ are too creaky to track. That's normal for tone 3 and probably fine.
Two-syllable words and phrases weren't pitch-checked.

**Done (2026-11-22):** all six re-recorded in Alina's voice (`eleven_v4`, flow
`NBZF0TUItoZeA88zBAWm`, 4 takes of the six words plus 3 takes of 怕 alone, 188 credits). Measured
the same way, the old 烫 read as tone 2 and the old 中 as a fall; the old 志, 谢 and 菜 passed tone 4 but
ended in a small rebound. Every new clip passes its own tone in the app's checker. 怕 failed in
all four takes of the word list (the long puff left little voiced sound), so it comes from a
separate take said as 怕！, which falls cleanly from 299 to 192 Hz. The ends of 志, 谢 and 菜 are cut where
the fall ends, before the rebound. Not yet heard by a person.

---

## Suggested order of work

1. **Quick text and quiz fixes:** A1–A7, C2 (one line), D1, D2, D5, D6, D8, B1 (reorder examples).
   No audio needed.
2. **Listen to the six G clips.** Re-record any that are wrong, in Alina's voice.
3. **Pair drills from existing audio:** C1/F7 split (needs 3–6 clips), F6 tone 2/3 (needs 雨), and
   the E6 checkpoint questions.
4. **New content with new Alina clips:** E1 finals, E2 er, E3 o, E4 ou, E5 neutral pairs, the F1–F5
   pairs, and the D1 and D2 listen steps. Roughly 50–60 clips.
5. **In-lesson tone coach step (D4).**
