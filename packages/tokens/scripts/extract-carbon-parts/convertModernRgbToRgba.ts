/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export const modernRgbColorFormatRegex: RegExp = /^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*(\d+)%\s*\)$/;

export function convertModernRgbToRgba(value: string): string {
  const modernRgbMatch = value.match(modernRgbColorFormatRegex);

  if (!modernRgbMatch) {
    return value;
  }

  const [, red, green, blue, alphaPercentString] = modernRgbMatch;
  const alphaPercent = Number.parseInt(alphaPercentString, 10);
  const clampedAlphaPercent = Math.max(0, Math.min(100, alphaPercent));
  const alpha = clampedAlphaPercent === 100 ? '1' : String(clampedAlphaPercent / 100);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
