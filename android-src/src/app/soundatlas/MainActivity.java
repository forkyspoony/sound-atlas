package app.soundatlas;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageInstaller;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.LinearLayout;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends Activity {
    // The live site. Anything pushed to GitHub shows up in the app automatically.
    static final String SITE = "https://forkyspoony.github.io/sound-atlas/";
    static final String VERSION_URL = SITE + "android/version.json";
    static final long CHECK_EVERY_MS = 6L * 60 * 60 * 1000; // re-check on resume at most every 6 h

    private WebView web;
    private FrameLayout root;
    private View customView;
    private WebChromeClient.CustomViewCallback customViewCallback;
    private final Handler ui = new Handler(Looper.getMainLooper());
    private boolean updateDialogShowing = false;

    @Override
    protected void onCreate(Bundle saved) {
        super.onCreate(saved);
        root = new FrameLayout(this);
        web = new WebView(this);
        root.addView(web, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(root);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);          // quiz progress (localStorage)
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setUserAgentString(s.getUserAgentString() + " SoundAtlasApp/" + versionName());
        web.setBackgroundColor(Color.parseColor("#f6f1e7"));

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest req) {
                Uri u = req.getUrl();
                if (u.toString().startsWith(SITE)) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception ignored) {}
                return true;
            }
            @Override
            public void onReceivedError(WebView v, WebResourceRequest req, WebResourceError err) {
                if (req.isForMainFrame()) showOffline(v);
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onShowCustomView(View view, CustomViewCallback cb) {
                if (customView != null) { cb.onCustomViewHidden(); return; }
                customView = view; customViewCallback = cb;
                root.addView(view, new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                web.setVisibility(View.GONE);
                getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
            }
            @Override
            public void onHideCustomView() { exitFullscreen(); }
        });

        if (saved != null) web.restoreState(saved);
        else web.loadUrl(SITE);

        checkForUpdate(true);
    }

    private void showOffline(WebView v) {
        String html = "<html><body style='font-family:serif;background:#f6f1e7;color:#2b4c7e;"
            + "display:flex;flex-direction:column;align-items:center;justify-content:center;height:90vh;text-align:center'>"
            + "<div style='font-size:64px;font-weight:bold'>/sæ/</div>"
            + "<p style='font-family:sans-serif'>Sound Atlas needs an internet connection.</p>"
            + "<button style='font-size:18px;padding:10px 24px;border:0;border-radius:8px;background:#2b4c7e;color:#f6f1e7' "
            + "onclick=\"location.href='" + SITE + "'\">Try again</button></body></html>";
        v.loadDataWithBaseURL(SITE, html, "text/html", "utf-8", SITE);
    }

    private void exitFullscreen() {
        if (customView == null) return;
        root.removeView(customView);
        customView = null;
        web.setVisibility(View.VISIBLE);
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        if (customViewCallback != null) customViewCallback.onCustomViewHidden();
    }

    @Override
    public void onBackPressed() {
        if (customView != null) { exitFullscreen(); return; }
        if (web.canGoBack()) web.goBack(); else super.onBackPressed();
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    protected void onResume() {
        super.onResume();
        web.onResume();
        checkForUpdate(false);
    }

    @Override
    protected void onPause() {
        web.onPause();
        super.onPause();
    }

    // ---------- self-update ----------

    private long versionCode() {
        try {
            PackageInfo p = getPackageManager().getPackageInfo(getPackageName(), 0);
            return Build.VERSION.SDK_INT >= 28 ? p.getLongVersionCode() : p.versionCode;
        } catch (Exception e) { return 0; }
    }

    private String versionName() {
        try { return getPackageManager().getPackageInfo(getPackageName(), 0).versionName; }
        catch (Exception e) { return "?"; }
    }

    private void checkForUpdate(boolean force) {
        final SharedPreferences prefs = getSharedPreferences("update", MODE_PRIVATE);
        long now = System.currentTimeMillis();
        if (!force && now - prefs.getLong("lastCheck", 0) < CHECK_EVERY_MS) return;
        prefs.edit().putLong("lastCheck", now).apply();
        new Thread(() -> {
            try {
                JSONObject j = new JSONObject(new String(fetch(VERSION_URL + "?t=" + System.currentTimeMillis()), "UTF-8"));
                final long latest = j.getLong("versionCode");
                final String name = j.optString("versionName", "");
                final String notes = j.optString("notes", "");
                final String apk = new URL(new URL(VERSION_URL), j.getString("apk")).toString();
                long skipped = prefs.getLong("skipped", 0);
                if (latest > versionCode() && (force || latest != skipped)) {
                    ui.post(() -> promptUpdate(latest, name, notes, apk));
                }
            } catch (Exception ignored) { /* offline or no version file: try again later */ }
        }).start();
    }

    private void promptUpdate(final long latest, String name, String notes, final String apk) {
        if (updateDialogShowing || isFinishing()) return;
        updateDialogShowing = true;
        String msg = "Version " + name + " is ready (you have " + versionName() + ")."
            + (notes.isEmpty() ? "" : "\n\n" + notes);
        new AlertDialog.Builder(this)
            .setTitle("Update Sound Atlas")
            .setMessage(msg)
            .setPositiveButton("Update", (d, w) -> downloadAndInstall(apk))
            .setNegativeButton("Later", (d, w) ->
                getSharedPreferences("update", MODE_PRIVATE).edit().putLong("skipped", latest).apply())
            .setOnDismissListener(d -> updateDialogShowing = false)
            .show();
    }

    private void downloadAndInstall(final String apkUrl) {
        LinearLayout box = new LinearLayout(this);
        box.setOrientation(LinearLayout.VERTICAL);
        int pad = (int) (24 * getResources().getDisplayMetrics().density);
        box.setPadding(pad, pad / 2, pad, 0);
        final ProgressBar bar = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        bar.setMax(100);
        final TextView label = new TextView(this);
        label.setText("Downloading…");
        box.addView(bar); box.addView(label);
        final AlertDialog dlg = new AlertDialog.Builder(this)
            .setTitle("Updating Sound Atlas").setView(box).setCancelable(false).show();

        new Thread(() -> {
            PackageInstaller.Session session = null;
            try {
                PackageInstaller pi = getPackageManager().getPackageInstaller();
                PackageInstaller.SessionParams params =
                    new PackageInstaller.SessionParams(PackageInstaller.SessionParams.MODE_FULL_INSTALL);
                params.setAppPackageName(getPackageName());
                int id = pi.createSession(params);
                session = pi.openSession(id);

                HttpURLConnection c = (HttpURLConnection) new URL(apkUrl).openConnection();
                c.setConnectTimeout(15000); c.setReadTimeout(30000);
                int total = c.getContentLength();
                try (InputStream in = c.getInputStream();
                     OutputStream out = session.openWrite("sound-atlas.apk", 0, total > 0 ? total : -1)) {
                    byte[] buf = new byte[65536];
                    int n; long done = 0; int lastPct = -1;
                    while ((n = in.read(buf)) > 0) {
                        out.write(buf, 0, n); done += n;
                        if (total > 0) {
                            final int pct = (int) (done * 100 / total);
                            if (pct != lastPct) { lastPct = pct; ui.post(() -> bar.setProgress(pct)); }
                        }
                    }
                    session.fsync(out);
                }
                Intent cb = new Intent(this, InstallReceiver.class);
                int flags = PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 31 ? PendingIntent.FLAG_MUTABLE : 0);
                PendingIntent p = PendingIntent.getBroadcast(this, id, cb, flags);
                session.commit(p.getIntentSender());
                session.close();
                ui.post(dlg::dismiss);
            } catch (final Exception e) {
                if (session != null) session.abandon();
                ui.post(() -> {
                    dlg.dismiss();
                    Toast.makeText(this, "Update failed: " + e.getMessage(), Toast.LENGTH_LONG).show();
                });
            }
        }).start();
    }

    static byte[] fetch(String url) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
        c.setConnectTimeout(10000); c.setReadTimeout(10000);
        c.setUseCaches(false);
        try (InputStream in = c.getInputStream()) {
            ByteArrayOutputStream b = new ByteArrayOutputStream();
            byte[] buf = new byte[8192]; int n;
            while ((n = in.read(buf)) > 0) b.write(buf, 0, n);
            return b.toByteArray();
        }
    }
}
