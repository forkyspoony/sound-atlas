#!/usr/bin/env python3
# Export every content table in index.html to content/<NAME>.json.
# Usage: python3 tools/extract_content.py <site-folder> <out-folder>   (needs: pip install playwright; a Chrome/Chromium)
import json, sys, subprocess, time, pathlib
from playwright.sync_api import sync_playwright
site, out = sys.argv[1], pathlib.Path(sys.argv[2])
srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8799', '-d', site], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
names = ['LANGS','PLACES','EMPH','S','TONES','TONESETS','EXTRA_WORDS','SEGS','MAPS','TERMS','PURE_SRC','SS_VID','PAIRS','LW','TPAIRS',
         'ES_ALL','ZH_ALL','AR_ALL','UNITS','LESSON_ALIAS','BOX_DAYS','COURSE_INFO','ACROSS_NOTES','AR_LETTERS','READ_GROUPS','READ_WORDS',
         'AUDIO','AUDIO_V','VOICE_INFO','MAIN_VOICE','FLAG_REASONS','PHRASES','VTARGET','GLIDE_HINT']
js = """(names)=>{const seen=new WeakSet();const o={};for(const n of names){let v;try{v=eval(n)}catch(e){o[n]={__error:String(e)};continue}
 o[n]=JSON.parse(JSON.stringify(v,(k,x)=>{if(k==='unit')return x&&x.id;if(typeof x==='function')return '[function]';return x}))}return o}"""
with sync_playwright() as p:
    b = p.chromium.launch(args=['--no-sandbox'])
    pg = b.new_page()
    pg.route('**/*', lambda r: r.abort() if not r.request.url.startswith('http://localhost:8799') else r.continue_())
    errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://localhost:8799/index.html'); pg.wait_for_timeout(1500)
    data = pg.evaluate(js, names)
    b.close()
srv.terminate()
print('page errors:', errs[:5])
for k,v in data.items():
    (out/f'{k}.json').write_text(json.dumps(v, ensure_ascii=False, indent=1))
    n = len(v) if hasattr(v,'__len__') else '-'
    print(k, type(v).__name__, n, 'ERR' if isinstance(v,dict) and '__error' in v else '')
