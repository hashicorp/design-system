/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export function serializeFlat(flat) {
  return `${JSON.stringify(flat, null, 2)}\n`;
}

export function parseFlat(source) {
  const parsed = JSON.parse(source);

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Expected a flat JSON object of translation keys');
  }

  const invalid = Object.entries(parsed).filter(
    ([, value]) => typeof value !== 'string'
  );

  if (invalid.length > 0) {
    throw new Error(
      `Translation values must be strings: ${invalid.map(([key]) => key).join(', ')}`
    );
  }

  return parsed;
}
