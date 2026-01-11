#!/usr/bin/env bash

# expo seems not clearing this
find . -type d -name 'www.bundle' -exec rm -rf {} +
export GENERATE_SOURCEMAP=false
export EXPO_DEBUG=true
#export PATH=$PATH:/home/gitpod/micromamba/envs/node/bin
pushd android

#./gradlew app:installRelease --stacktrace
./gradlew app:installRelease

popd

scp android/app/build/outputs/apk/release/app-release.apk android/
#scp android/app/build/outputs/apk/release/app-release.apk apple@nfs.sai.l:/mnt/data/nfs-cache/app-release.apk

#cp android/app/build/outputs/apk/release/app-release.apk /w/app-release.apk
#rsync -avz --exclude 'android' --exclude 'node_modules' --progress /mnt/data/nfs/gitpod-clion/data/tpa/ /mnt/data/nfs-cache/backup/tpa/
#rsync --exclude 'android' --exclude 'node_modules' -av --progress ./ $sai:/mnt/data/nfs/tpa/
