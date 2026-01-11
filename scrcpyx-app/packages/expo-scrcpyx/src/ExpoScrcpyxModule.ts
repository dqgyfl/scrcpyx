import { NativeModule, requireNativeModule } from 'expo';

import { ExpoScrcpyxModuleEvents } from './ExpoScrcpyx.types';

declare class ExpoScrcpyxModule extends NativeModule<ExpoScrcpyxModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoScrcpyxModule>('ExpoScrcpyx');
