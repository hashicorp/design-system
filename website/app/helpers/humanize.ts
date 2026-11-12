/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

const SEPARATORS = /_+|-+/g;

export default function humanize(value: string | undefined | null): string {
  if (value === undefined || value === null) {
    return '';
  }

  const words = value.toLowerCase().replace(SEPARATORS, ' ');

  return words.charAt(0).toUpperCase() + words.slice(1);
}
