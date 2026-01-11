```shell

adb connect 127.0.0.1:16384
adb reverse tcp:8081 tcp:8081

```

```shell
        android:usesCleartextTraffic="true"
        android:largeHeap="true"
        
        cd android ./gradlew app:installRelease
        
EXPO_DEBUG=true;REACT_NATIVE_PACKAGER_HOSTNAME=localhost
export EXPO_DEBUG=true;
export REACT_NATIVE_PACKAGER_HOSTNAME=localhost
# quick fix for 0.76.2, unknown cahcar
cp ReactNative-application.cmake node_modules/react-native/ReactAndroid/cmake-utils
```

```

// not working?
// hermesFlags = ["-O", "-output-source-map"]
// app/build.gradle in android {} block

        applicationVariants.all { variant ->
            if (variant.buildType.name == 'release') {
                variant.mergeAssetsProvider.configure {
                    doLast {
                        delete(fileTree(dir: outputDir, includes: ['**/*.js.map']))
                    }
                }
            }
            }
```

```bash
npx expo prebuild --clean --pnpm
npx expo install --check
```

```bash
# node_modules/three/src/renderers/webgl/WebGLProgram.js
sed -i 's/renderer.debug.checkShaderErrors/false/' \
    node_modules/three/build/three.cjs

sed -i 's/if ( renderer.debug.checkShaderErrors ) {/if ( false ) {/' \
    node_modules/three/src/renderers/webgl/WebGLProgram.js
    
sed -i 's/if ( renderer.debug.checkShaderErrors ) {/if ( false ) {/' \
    node_modules/three/build/three.cjs

sed -i 's/if ( renderer.debug.checkShaderErrors ) {/if ( false \&\& renderer.debug.checkShaderErrors ) {/' \
    node_modules/three/src/renderers/webgl/WebGLProgram.js

	function onFirstUse( self ) {


		// check for link errors
		if ( false && renderer.debug.checkShaderErrors ) {


```

```
// env config rungin android
ANDROID_HOME=/data/sdk/android;ANDROID_SDK_ROOT=/data/sdk/android;EXPO_DEBUG=true;JAVA_HOME=/data/sdk/java/jdk-21;REACT_NATIVE_PACKAGER_HOSTNAME=nfs.sai.l

./cmdline-tools/latest/bin/sdkmanager --install "platforms;android-33" "build-tools;34.0.0"
```

```
npx create-react-native-library

disable svg
node_modules/@d11/react-native-fast-image/android/build.gradle
```
