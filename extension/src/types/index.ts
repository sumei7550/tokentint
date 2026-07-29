export interface Color {
  id: string;
  name: string;
  value: string;
  type: 'color';
  timestamp?: number;
}

export interface Project {
  id: string;
  name: string;
  colors: Color[];
  createdAt: number;
  updatedAt: number;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  defaultFormat: 'hex' | 'rgb' | 'hsl';
  locale: string;
  activeProjectId?: string;
}

export interface Entitlement {
  isPro: boolean;
  activationToken?: string;
  activatedAt?: number;
}

export interface StorageData {
  version: number;
  projects: Project[];
  colorHistory: Color[];
  settings: Settings;
  entitlement: Entitlement;
}

export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface ExtractedColor {
  value: string;
  count: number;
  elements: number;
}

export interface Message {
  type: 'EXTRACT_COLORS' | 'GET_ENTITLEMENT' | 'ACTIVATE_LICENSE' | 'RESTORE_LICENSE';
  payload?: {
    tabId?: number;
    token?: string;
  };
}

export interface MessageResponse {
  success: boolean;
  data?: any;
  error?: string;
}
