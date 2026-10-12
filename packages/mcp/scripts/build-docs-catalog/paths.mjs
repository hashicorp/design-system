/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// where the corpus is read from and written to, and how a file on disk becomes a route

import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_ROOT = path.resolve(fileURLToPath(import.meta.url), "../../..");

export const DOCS_DIR = path.resolve(PACKAGE_ROOT, "../../website/docs");
export const COMPONENT_CATALOG_FILE_PATH =
  "../components/component-catalog.json";
export const COMPONENT_CATALOG_FILE = path.resolve(
  PACKAGE_ROOT,
  COMPONENT_CATALOG_FILE_PATH,
);
export const CATALOG_FILE = path.join(PACKAGE_ROOT, "docs-catalog.json");
// a drift check builds into a temp directory and diffs against the committed file, so the
// destination has to be redirectable without moving the baseline
export const [, , OUTPUT_FILE_PATH_ARG] = process.argv;
export const OUTPUT_FILE = path.resolve(
  process.env.DOCS_CATALOG_OUTPUT ?? OUTPUT_FILE_PATH_ARG ?? CATALOG_FILE,
);

export const SITE_BASE_URL = "https://helios.hashicorp.design/";

// pages under this route seem like they are development artifacts
export const EXCLUDED_SECTION = "testing";
// everything under a `partials/` segment is a fragment
const PARTIALS_SEGMENT = "partials";

export function fail(message) {
  console.error(`\n\x1b[31m⚠️  Error: ${message}\x1b[0m\n`);

  process.exit(1);
}

export function toPosix(value) {
  return value.split(path.sep).join("/");
}

// the path as an author would name it, for error messages
export function relativeToDocs(target) {
  return toPosix(path.relative(DOCS_DIR, target));
}

export function byCodepoint(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

export function collectMarkdownFiles(directory, found = []) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const entriesSortedByCodepoint = entries.sort((a, b) =>
    byCodepoint(a.name, b.name),
  );

  entriesSortedByCodepoint.forEach((entry) => {
    const full = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      collectMarkdownFiles(full, found);
    } else if (entry.name.endsWith(".md")) {
      found.push(full);
    }
  });

  return found;
}

export function isPartial(file) {
  return relativeToDocs(file).split("/").includes(PARTIALS_SEGMENT);
}

// 'components/button/index.md' -> 'components/button', matching `website/app/router.js`
export function routeForFile(file) {
  return relativeToDocs(file).replace(/(\/index)?\.md$/, "");
}
