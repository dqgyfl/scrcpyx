import type { ViewProps} from 'react-native';

export type OnLoadEventPayload = {
  url: string;
};

export type ExpoScrcpyxModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type ExpoScrcpyxViewProps = ViewProps & {
  onStatusChange?: (event: {
      state: 'connected' | 'disconnected' | 'error'
      message?: string
  }) => void
};
