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

// returns { file, source } entries with posix paths relative to the directory
export function collect(directory, pattern, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    const file = `${prefix}${entry.name}`;

    if (entry.isDirectory()) {
      return collect(absolute, pattern, `${file}/`);
    }

    return pattern.test(file)
      ? [{ file, source: readFileSync(absolute, 'utf8') }]
      : [];
  });
}

export function localeFilePattern(locale) {
  return new RegExp(`(?:^|/)${locale}\\.ya?ml$`);
}

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
