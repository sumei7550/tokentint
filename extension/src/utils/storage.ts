import type { StorageData, Color, Project, Settings, Entitlement } from '../types';

const STORAGE_VERSION = 1;

const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  defaultFormat: 'hex',
  locale: 'en'
};

const DEFAULT_ENTITLEMENT: Entitlement = {
  isPro: false
};

export async function initStorage(): Promise<void> {
  const data = await chrome.storage.local.get('version');

  if (!data.version) {
    const initialData: StorageData = {
      version: STORAGE_VERSION,
      projects: [createDefaultProject()],
      colorHistory: [],
      settings: DEFAULT_SETTINGS,
      entitlement: DEFAULT_ENTITLEMENT
    };
    await chrome.storage.local.set(initialData);
  } else if (data.version < STORAGE_VERSION) {
    await migrateStorage(data.version);
  }
}

function createDefaultProject(): Project {
  return {
    id: generateId(),
    name: 'Default Project',
    colors: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
}

export async function migrateStorage(fromVersion: number): Promise<void> {
  if (fromVersion < STORAGE_VERSION) {
    const data = await chrome.storage.local.get(null) as Partial<StorageData>;

    const migratedData: StorageData = {
      version: STORAGE_VERSION,
      projects: data.projects || [createDefaultProject()],
      colorHistory: data.colorHistory || [],
      settings: { ...DEFAULT_SETTINGS, ...data.settings },
      entitlement: { ...DEFAULT_ENTITLEMENT, ...data.entitlement }
    };

    await chrome.storage.local.clear();
    await chrome.storage.local.set(migratedData);
  }
}

export async function getColorHistory(): Promise<Color[]> {
  const data = await chrome.storage.local.get('colorHistory');
  return data.colorHistory || [];
}

export async function addColorToHistory(color: Color): Promise<void> {
  const history = await getColorHistory();
  const filtered = history.filter(c => c.value !== color.value);
  const updated = [color, ...filtered].slice(0, 20);
  await chrome.storage.local.set({ colorHistory: updated });
}

export async function clearColorHistory(): Promise<void> {
  await chrome.storage.local.set({ colorHistory: [] });
}

export async function getProjects(): Promise<Project[]> {
  const data = await chrome.storage.local.get('projects');
  return data.projects || [createDefaultProject()];
}

export async function saveProject(project: Project): Promise<void> {
  const projects = await getProjects();
  const index = projects.findIndex(p => p.id === project.id);

  if (index !== -1) {
    projects[index] = { ...project, updatedAt: Date.now() };
  } else {
    projects.push(project);
  }

  await chrome.storage.local.set({ projects });
}

export async function deleteProject(projectId: string): Promise<void> {
  const projects = await getProjects();
  const filtered = projects.filter(p => p.id !== projectId);

  if (filtered.length === 0) {
    filtered.push(createDefaultProject());
  }

  await chrome.storage.local.set({ projects: filtered });
}

export async function getSettings(): Promise<Settings> {
  const data = await chrome.storage.local.get('settings');
  return { ...DEFAULT_SETTINGS, ...data.settings };
}

export async function updateSettings(settings: Partial<Settings>): Promise<void> {
  const current = await getSettings();
  await chrome.storage.local.set({ settings: { ...current, ...settings } });
}

export async function getEntitlement(): Promise<Entitlement> {
  const data = await chrome.storage.local.get('entitlement');
  return { ...DEFAULT_ENTITLEMENT, ...data.entitlement };
}

export async function setEntitlement(entitlement: Entitlement): Promise<void> {
  await chrome.storage.local.set({ entitlement });
}

export async function exportData(): Promise<StorageData> {
  return await chrome.storage.local.get(null) as StorageData;
}

export async function importData(data: StorageData): Promise<void> {
  if (data.version && data.version <= STORAGE_VERSION) {
    await chrome.storage.local.clear();
    await chrome.storage.local.set(data);
  } else {
    throw new Error('Invalid or incompatible backup data');
  }
}

export async function clearAllData(): Promise<void> {
  await chrome.storage.local.clear();
  await initStorage();
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
