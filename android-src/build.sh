#!/usr/bin/env bash
# Builds the Sound Atlas APK and the version.json the app checks for updates.
# Usage: KEYSTORE=path/to/sound-atlas.jks KS_PASS=... ./build.sh <versionCode> <versionName> ["release notes"]
# Every new release needs a higher versionCode and the SAME keystore, or phones can't update.
set -euo pipefail
cd "$(dirname "$0")"
VC=${1:?versionCode}; VN=${2:?versionName}; NOTES=${3:-}
SDK=${ANDROID_HOME:-/opt/android}; BT=$SDK/build-tools/35.0.0; JAR=$SDK/platforms/android-34/android.jar
OUT=../android; B=build
rm -rf $B && mkdir -p $B/classes $B/dex $OUT

$BT/aapt2 compile --dir res -o $B/res.zip
$BT/aapt2 link -o $B/base.apk -I $JAR --manifest AndroidManifest.xml $B/res.zip \
  --version-code "$VC" --version-name "$VN" --java $B/gen --auto-add-overlay
javac -nowarn -Xlint:-options -source 8 -target 8 -bootclasspath $JAR -classpath $BT/core-lambda-stubs.jar -d $B/classes \
  $(find src $B/gen -name '*.java')
$BT/d8 --min-api 24 --lib $JAR --output $B/dex $(find $B/classes -name '*.class')
cp $B/base.apk $B/unsigned.apk && (cd $B/dex && zip -q ../unsigned.apk classes.dex)
$BT/zipalign -f -p 4 $B/unsigned.apk $B/aligned.apk
$BT/apksigner sign --v4-signing-enabled false --ks "${KEYSTORE:?}" --ks-pass env:KS_PASS --out $OUT/sound-atlas.apk $B/aligned.apk

python3 - "$VC" "$VN" "$NOTES" > $OUT/version.json <<'EOF'
import json, sys
print(json.dumps({"versionCode": int(sys.argv[1]), "versionName": sys.argv[2],
                  "apk": "sound-atlas.apk", "notes": sys.argv[3]}, indent=2))
EOF
rm -rf $B
echo "Built $OUT/sound-atlas.apk (v$VN, code $VC)"
