# Sound Atlas Android app

A small Android app that opens https://forkyspoony.github.io/sound-atlas/ full-screen.

- **Site changes** show up in the app right away, because the app loads the live site.
- **App updates:** on launch (and at most every 6 hours on resume) the app reads
  `android/version.json`. If its `versionCode` is higher than the installed one, it offers
  a one-tap update that downloads `android/sound-atlas.apk` and installs it.

## Releasing a new app version

```
KEYSTORE=/path/to/sound-atlas.jks KS_PASS='…' ./build.sh 2 1.1 "What changed"
git add ../android && git commit -m "Android 1.1" && git push
```

Always raise the versionCode and sign with the **same keystore**. Android refuses updates
signed with a different key. The keystore is not in this repo.

Needs the Android SDK (platform 34, build-tools 35) and a JDK.
