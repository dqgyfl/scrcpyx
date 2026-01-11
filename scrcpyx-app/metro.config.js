// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config');
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
let config = getDefaultConfig(__dirname);
console.log('--------------------------------------------------', config)

const jsoMetroPlugin = require("obfuscator-io-metro-plugin")(
    {
        // for these option look javascript-obfuscator library options from  above url
        compact: false,
        sourceMap: false, // source Map generated after obfuscation is not useful right now so use default value i.e. false
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1,
    },
    {
        runInDev: false /* optional */,
        logObfuscatedFiles: true /* optional generated files will be located at ./.jso */,
    }
);

config = {
    ...config,
    resolver: {
        ...config.resolver,
        // unstable_enablePackageExports: true,
        platforms: ['ios', 'android', 'web'],
        sourceMap: false
    },
    transformer: {
        ...config.transformer,
        generateSourceMaps: false,
        sourceMap: false,
        minifierConfig: {
            sourceMap: false
        }
    },
    watchFolders: [
        ...config.watchFolders,
        path.resolve(__dirname, 'src')
    ],
    ...jsoMetroPlugin
};

const {withTamagui} = require('@tamagui/metro-plugin')
config = withTamagui(config, {
    components: ['tamagui'],
    config: './src/tamagui.config.ts',
    outputCSS: './src/tamagui-web.css',
    // disableExtraction: process.env.NODE_ENV === 'development',
})

console.log('--------------------------------------------------', config)

module.exports = config
