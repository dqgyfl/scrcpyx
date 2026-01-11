// https://docs.expo.dev/versions/latest/sdk/build-properties/#pluginconfigtypeandroid

const {withAndroidManifest} = require("@expo/config-plugins")


module.exports = function (config) {
    return withAndroidManifest(config, async config => {
        let manifest = config.modResults.manifest
        // console.log(manifest.application)

        let appManifest = manifest.application[0]
        appManifest.$ = {
            ...appManifest.$,

            'android:usesCleartextTraffic': true,
            'android:largeHeap': true
        }

        return config
    })
};

// module.exports = withCustomProductName;
