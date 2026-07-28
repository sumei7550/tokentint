import type { Color, Project } from '../types';

export function exportCSSVariables(project: Project): string {
  const lines = [':root {'];

  project.colors.forEach(color => {
    const varName = toKebabCase(color.name);
    lines.push(`  --${varName}: ${color.value};`);
  });

  lines.push('}');

  return lines.join('\n');
}

export function exportTailwindConfig(project: Project): string {
  const colors: Record<string, string> = {};

  project.colors.forEach(color => {
    const key = toCamelCase(color.name);
    colors[key] = color.value;
  });

  const config = {
    theme: {
      extend: {
        colors
      }
    }
  };

  return `module.exports = ${JSON.stringify(config, null, 2)}`;
}

export function exportW3CTokens(project: Project): string {
  const tokens: Record<string, any> = {
    color: {}
  };

  project.colors.forEach(color => {
    const key = toCamelCase(color.name);
    tokens.color[key] = {
      $value: color.value,
      $type: 'color'
    };
  });

  return JSON.stringify(tokens, null, 2);
}

export function exportJSON(project: Project): string {
  const colors: Record<string, string> = {};

  project.colors.forEach(color => {
    colors[color.name] = color.value;
  });

  return JSON.stringify(colors, null, 2);
}

function toKebabCase(str: string): string {
  return str
    .replace(/\s+/g, '-')
    .replace(/[A-Z]/g, letter => '-' + letter.toLowerCase())
    .replace(/^-/, '')
    .toLowerCase();
}

function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, '');
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
