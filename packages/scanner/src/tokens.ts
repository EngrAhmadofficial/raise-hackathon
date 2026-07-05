import fs from "fs";

export type DesignTokens = {
  colors: Record<string, unknown>;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  typography: { fontSize: Record<string, string> };
};

export type FlatColor = {
  /** Tailwind-compatible class suffix, e.g. "brand-primary" or "slate-50" */
  name: string;
  hex: string;
  rgb: [number, number, number];
};

export function loadTokens(tokensFile: string): DesignTokens {
  if (!fs.existsSync(tokensFile)) {
    throw new Error(`Design tokens file not found: ${tokensFile}`);
  }
  return JSON.parse(fs.readFileSync(tokensFile, "utf-8")) as DesignTokens;
}

export function hexToRgb(hex: string): [number, number, number] | null {
  let value = hex.replace("#", "");
  if (value.length === 3 || value.length === 4) {
    value = value
      .split("")
      .map(c => c + c)
      .join("");
  }
  if (value.length !== 6 && value.length !== 8) return null;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return null;
  return [r, g, b];
}

export function flattenColors(colors: Record<string, unknown>, prefix = ""): FlatColor[] {
  const flat: FlatColor[] = [];
  for (const [key, value] of Object.entries(colors)) {
    const name = prefix ? `${prefix}-${key}` : key;
    if (typeof value === "string") {
      const rgb = hexToRgb(value);
      if (rgb) flat.push({ name, hex: value.toLowerCase(), rgb });
    } else if (value && typeof value === "object") {
      flat.push(...flattenColors(value as Record<string, unknown>, name));
    }
  }
  return flat;
}

/** Finds the design token color closest to the given hex (Euclidean RGB distance). */
export function nearestColor(hex: string, palette: FlatColor[]): FlatColor | null {
  const rgb = hexToRgb(hex);
  if (!rgb || palette.length === 0) return null;

  let best: FlatColor | null = null;
  let bestDistance = Infinity;
  for (const candidate of palette) {
    const distance =
      (rgb[0] - candidate.rgb[0]) ** 2 +
      (rgb[1] - candidate.rgb[1]) ** 2 +
      (rgb[2] - candidate.rgb[2]) ** 2;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }
  return best;
}

export function parsePx(value: string): number | null {
  const match = value.match(/^(\d+(?:\.\d+)?)px$/);
  return match ? parseFloat(match[1]) : null;
}

/**
 * Finds the scale key whose px value is closest to the given px value.
 * Ties resolve to the smaller value (conservative visual change).
 */
export function nearestScaleKey(px: number, scale: Record<string, string>): string | null {
  let bestKey: string | null = null;
  let bestValue = 0;
  let bestDistance = Infinity;

  for (const [key, raw] of Object.entries(scale)) {
    const value = parsePx(raw);
    if (value === null) continue;
    // `full` radius (9999px) should never win a nearest-match
    if (value > 1000) continue;
    const distance = Math.abs(px - value);
    if (distance < bestDistance || (distance === bestDistance && value < bestValue)) {
      bestDistance = distance;
      bestValue = value;
      bestKey = key;
    }
  }
  return bestKey;
}
