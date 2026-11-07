// Sound Atlas on GitHub Pages: Google sign-in + Firestore sync.
// Provides the same small `claude.use('db'|'user')` interface the app already uses, backed by Firebase.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

const firebaseConfig = {"apiKey":"AIzaSyBOsrq4_1eCD4ZnIWeOX7TJg80I8_X_cFc","authDomain":"sound-atlas-40f39.firebaseapp.com","projectId":"sound-atlas-40f39","storageBucket":"sound-atlas-40f39.firebasestorage.app","messagingSenderId":"660586315684","appId":"1:660586315684:web:6079a82391bac1186f0b31"}
;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = getFirestore(app);
let current = null;

// collection('data/users/<uid>').doc('progress')  ->  users/<uid>/data/progress
const dbApi = {
  collection(path) {
    const uid = path.split('/')[2];
    return { doc(id) {
      const ref = doc(fs, 'users', uid, 'data', id);
      return {
        async get() { const s = await getDoc(ref); return { exists: s.exists(), data: () => s.data() }; },
        async set(v) { await setDoc(ref, v); }
      };
    } };
  }
};
const userApi = { async id() { return current ? current.uid : null; } };
window.claude = { use: async (name) => name === 'db' ? dbApi : name === 'user' ? userApi : null };

function renderAcct() {
  let el = document.getElementById('acct');
  if (!el) {
    el = document.createElement('div'); el.id = 'acct';
    const h = document.querySelector('header') || document.body.firstElementChild;
    h.appendChild(el);
  }
  if (current) {
    el.innerHTML = `<span class="acct-who">${(current.email || 'Signed in').replace(/</g, '&lt;')}</span> <button class="btn ghost acct-btn" id="acct-out">Sign out</button>`;
    document.getElementById('acct-out').onclick = async () => { await signOut(auth); };
  } else {
    el.innerHTML = `<button class="btn acct-btn" id="acct-in">Sign in with Google to sync</button>`;
    document.getElementById('acct-in').onclick = async () => {
      const p = new GoogleAuthProvider();
      try { await signInWithPopup(auth, p); }
      catch (e) {
        if (e && (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment')) await signInWithRedirect(auth, p);
        else if (e && e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') alert('Sign-in failed: ' + (e.code || e.message));
      }
    };
  }
}

getRedirectResult(auth).catch(() => {});
onAuthStateChanged(auth, (u) => {
  current = u;
  renderAcct();
  if (u) { if (typeof initSync === 'function') initSync(); }
  else {
    try { syncRef = null; } catch (e) {}
    if (typeof setSync === 'function') setSync('Progress is saved on this device. Sign in with Google (top of the page) to sync it between your phone and computer.');
  }
});
