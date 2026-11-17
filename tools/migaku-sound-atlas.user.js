// ==UserScript==
// @name         Migaku → Sound Atlas
// @namespace    https://forkyspoony.github.io/sound-atlas
// @version      1.0
// @description  Highlight IPA on a Migaku Memory card and open the matching sound card in Sound Atlas.
// @match        https://study.migaku.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const BASE = 'https://forkyspoony.github.io/sound-atlas/';
  const MAX_SELECTION = 60; // ignore long selections (whole sentences)

  // [symbol, Sound Atlas id, name]. Mirrors the S table in index.html.
  const SOUNDS = [
    ['r', 'r', 'Rolled R'], ['ɾ', 'tap', 'Tapped R'], ['x', 'x', 'Back-of-throat H'],
    ['ɣ', 'gh', 'Soft gargle G'], ['β', 'beta', 'Soft B'], ['ɲ', 'ny', 'Palatal N (ñ)'],
    ['ʝ', 'yy', 'Buzzy Y'], ['p', 'pu', 'Unaspirated P'], ['pʰ', 'ph', 'Aspirated P'],
    ['t̪', 'td', 'Dental T'], ['ð', 'eth', 'Soft D'], ['θ', 'th', 'TH (as in think)'],
    ['ts', 'ts', 'Pinyin z'], ['tsʰ', 'tsh', 'Pinyin c'], ['ʈʂ', 'tsr', 'Pinyin zh'],
    ['ʈʂʰ', 'tsrh', 'Pinyin ch'], ['ʂ', 'sr', 'Pinyin sh'], ['ɻ', 'rr', 'Pinyin r'],
    ['tɕ', 'tc', 'Pinyin j'], ['tɕʰ', 'tch', 'Pinyin q'], ['ɕ', 'xx', 'Pinyin x'],
    ['ʔ', 'gs', 'Glottal stop'], ['ħ', 'hh', 'Breathy throat H'], ['ʕ', 'ain', 'ʿAyn'],
    ['q', 'q', 'Deep K (qāf)'], ['sˤ', 'ems', 'Emphatic S'], ['tˤ', 'emt', 'Emphatic T'],
    ['dˤ', 'emd', 'Emphatic D'], ['zˤ', 'emz', 'Emphatic Z'], ['h', 'h', 'Plain H'],
    ['ʒ', 'jzh', 'Levantine J'], ['i', 'vi', 'Pure "ee"'], ['y', 'vy', 'Pinyin ü'],
    ['ɨ', 'vbuzz', 'Buzzy "i"'], ['u', 'vu', 'Pure "oo"'], ['e', 've', 'Pure "e"'],
    ['ɤ', 'vgam', 'Pinyin e'], ['o', 'vo', 'Pure "o"'], ['ə', 'vschwa', 'Schwa'],
    ['a', 'va', 'Open "ah"'],
  ];

  // Other common ways of writing the same sounds.
  const ALIASES = [
    ['tʂʰ', 'tsrh'], ['tʂ', 'tsr'], ['ʐ', 'rr'], ['ɹ̩', 'vbuzz'], ['ɻ̩', 'vbuzz'],
    ['ʐ̩', 'vbuzz'], ['z̩', 'vbuzz'], ['ɯ', 'vbuzz'], ['χ', 'x'], ['ɦ', 'h'],
  ];

  const BYID = {};
  SOUNDS.forEach(([sym, id, name]) => { BYID[id] = { sym, id, name }; });
  const TABLE = SOUNDS.map(([sym, id]) => [sym, id]).concat(ALIASES)
    .map(([sym, id]) => [sym.normalize('NFD'), id])
    .sort((a, b) => b[0].length - a[0].length); // longest symbol first

  function clean(text) {
    return text.normalize('NFD')
      .replace(/[͜͡]/g, '')   // tie bars: t͡s → ts
      .replace(/[ˁˀ]/g, 'ˤ')            // other pharyngeal marks
      .replace(/ʼ/g, 'ʔ');
  }

  // Sounds found in the text, in order, no repeats.
  function findSounds(text) {
    const s = clean(text), out = [], seen = new Set();
    let i = 0;
    while (i < s.length) {
      const hit = TABLE.find(([sym]) => s.startsWith(sym, i));
      if (hit) {
        if (!seen.has(hit[1])) { seen.add(hit[1]); out.push(BYID[hit[1]]); }
        i += hit[0].length;
      } else i++;
    }
    return out;
  }

  let pop = null;
  function hide() { if (pop) { pop.remove(); pop = null; } }

  function show(sounds, rect) {
    hide();
    pop = document.createElement('div');
    pop.id = 'sa-pop';
    pop.style.cssText = 'all:initial;position:fixed;z-index:2147483647;display:flex;flex-wrap:wrap;' +
      'gap:4px;align-items:center;max-width:320px;padding:6px 8px;background:#2b4c7e;border-radius:10px;' +
      'box-shadow:0 4px 16px rgba(0,0,0,.35);font:13px/1.2 system-ui,sans-serif;color:#f6f1e7';
    const label = document.createElement('span');
    label.textContent = 'Sound Atlas:';
    label.style.cssText = 'all:initial;font:600 12px system-ui,sans-serif;color:#f6f1e7;margin-right:2px';
    pop.appendChild(label);
    sounds.forEach(s => {
      const a = document.createElement('a');
      a.href = BASE + '#sound/' + s.id;
      a.target = 'soundatlas'; // reuse one Sound Atlas tab
      a.title = s.name;
      a.textContent = s.sym;
      a.style.cssText = 'all:initial;cursor:pointer;min-width:22px;text-align:center;padding:3px 7px;' +
        'background:#f6f1e7;color:#1f1b16;border-radius:6px;' +
        'font:18px/1.2 "Gentium Book Plus","Gentium Plus","Charis SIL","Doulos SIL",serif';
      a.addEventListener('click', () => setTimeout(hide, 0));
      pop.appendChild(a);
    });
    pop.addEventListener('mousedown', e => e.preventDefault()); // keep the highlight
    document.documentElement.appendChild(pop);
    const w = pop.offsetWidth, h = pop.offsetHeight;
    let top = rect.top - h - 8;
    if (top < 4) top = rect.bottom + 8;
    const left = Math.max(4, Math.min(rect.left + rect.width / 2 - w / 2, innerWidth - w - 4));
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
  }

  function check() {
    const sel = window.getSelection();
    const text = sel ? sel.toString().trim() : '';
    if (!text || text.length > MAX_SELECTION || !sel.rangeCount) return hide();
    const sounds = findSounds(text);
    if (!sounds.length) return hide();
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    if (!rect.width && !rect.height) return hide();
    show(sounds.slice(0, 10), rect);
  }

  let timer = null;
  document.addEventListener('selectionchange', () => {
    clearTimeout(timer);
    timer = setTimeout(check, 250);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
  window.addEventListener('scroll', hide, true);
})();
