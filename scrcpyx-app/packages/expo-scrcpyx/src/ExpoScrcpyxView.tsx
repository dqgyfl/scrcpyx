import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoScrcpyxViewProps } from './ExpoScrcpyx.types';

const NativeView: React.ComponentType<ExpoScrcpyxViewProps> =
  requireNativeView('ExpoScrcpyx');

export default function ExpoScrcpyxView(props: ExpoScrcpyxViewProps) {
  return <NativeView {...props} />;
}
