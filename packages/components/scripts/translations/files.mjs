/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

import { localeOf } from './catalog.mjs';

// returns { file, source } entries with posix paths relative to the directory
export function collect(directory, include, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    const file = `${prefix}${entry.name}`;

    if (entry.isDirectory()) {
      return collect(absolute, include, `${file}/`);
    }

    return include(file)
      ? [{ file, source: readFileSync(absolute, 'utf8') }]
      : [];
  });
}

export const isYamlFile = (file) => /\.ya?ml$/.test(file);

export const isLocaleFile = (locale) => (file) =>
  isYamlFile(file) && localeOf(file) === locale;

// a null source deletes the file
export function writeFiles(directory, files) {
  for (const { file, source } of files) {
    const absolute = path.join(directory, file);

    if (source === null) {
      rmSync(absolute, { force: true });
    } else {
      mkdirSync(path.dirname(absolute), { recursive: true });
      writeFileSync(absolute, source);
    }
  }
}
