import { registerWebModule, NativeModule } from 'expo';

import { ExpoScrcpyxModuleEvents } from './ExpoScrcpyx.types';

class ExpoScrcpyxModule extends NativeModule<ExpoScrcpyxModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoScrcpyxModule, 'ExpoScrcpyxModule');
