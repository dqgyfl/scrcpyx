// Reexport the native module. On web, it will be resolved to ExpoScrcpyxModule.web.ts
// and on native platforms to ExpoScrcpyxModule.ts
export { default } from './ExpoScrcpyxModule';
export { default as ExpoScrcpyxView } from './ExpoScrcpyxView';
export * from  './ExpoScrcpyx.types';
