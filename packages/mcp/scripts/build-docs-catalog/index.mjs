#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// generates `docs-catalog.json`

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { readFrontmatter } from "./frontmatter.mjs";
import { buildPage } from "./pages.mjs";
import {
  CATALOG_FILE,
  DOCS_DIR,
  EXCLUDED_SECTION,
  OUTPUT_FILE,
  SITE_BASE_URL,
  byCodepoint,
  collectMarkdownFiles,
  fail,
  isPartial,
  routeForFile,
} from "./paths.mjs";
import { assertComponentCatalogJoin, validate } from "./validate.mjs";

function resolveBundledAt(catalog) {
  const now = new Date().toISOString();

  if (!existsSync(CATALOG_FILE)) {
    return now;
  }

  let previous;

  try {
    previous = JSON.parse(readFileSync(CATALOG_FILE, "utf8"));
  } catch {
    return now;
  }

  if (typeof previous.bundledAt !== "string") {
    return now;
  }

  const unchanged =
    JSON.stringify({ ...previous, bundledAt: "" }) === JSON.stringify(catalog);

  return unchanged ? previous.bundledAt : now;
}

function collectPages() {
  const pages = [];
  const collectedMarkdownFiles = collectMarkdownFiles(DOCS_DIR);

  for (const file of collectedMarkdownFiles) {
    if (isPartial(file)) {
      continue;
    }

    const route = routeForFile(file);

    if (
      route === EXCLUDED_SECTION ||
      route.startsWith(`${EXCLUDED_SECTION}/`)
    ) {
      continue;
    }

    const { data, body } = readFrontmatter(file);

    if (data.navigation?.hidden === true) {
      continue;
    }

    pages.push(buildPage(file, route, data, body));
  }

  return pages.sort((a, b) => byCodepoint(a.route, b.route));
}

function main() {
  if (!existsSync(DOCS_DIR)) {
    fail(`the website docs directory was not found at ${DOCS_DIR}`);
  }

  const pages = collectPages();
  const joinCount = assertComponentCatalogJoin(validate(pages));

  const catalog = {
    bundledAt: "",
    siteBaseUrl: SITE_BASE_URL,
    pages: Object.fromEntries(pages.map((page) => [page.route, page])),
  };

  catalog.bundledAt = resolveBundledAt(catalog);

  mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

  writeFileSync(OUTPUT_FILE, `${JSON.stringify(catalog, null, 2)}\n`);

  const chunkCount = pages.reduce(
    (total, page) => total + page.chunks.length,
    0,
  );

  const megabytes = (readFileSync(OUTPUT_FILE).length / 1024 / 1024).toFixed(2);

  console.log(
    `${path.basename(OUTPUT_FILE)}: ${pages.length} pages, ${chunkCount} chunks, ` +
      `${joinCount} component docsPath values joined, ${megabytes}MB`,
  );
}

main();
