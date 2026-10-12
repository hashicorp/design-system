/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { existsSync, readFileSync } from "node:fs";
import { FENCED_CODE } from "./markdown.mjs";
import { COMPONENT_CATALOG_FILE, byCodepoint, fail } from "./paths.mjs";

export function validate(pages) {
  const routes = new Set(pages.map((page) => page.route));

  if (routes.size !== pages.length) {
    const seen = new Set();
    const duplicate = pages.find((page) => !seen.add(page.route));

    fail(`two docs pages share the route '${duplicate.route}'`);
  }

  for (const page of pages) {
    for (const related of page.related ?? []) {
      if (routes.has(related)) {
        continue;
      }

      fail(
        `${page.route} lists a \`related\` route that is not in this catalog: '${related}'`,
      );
    }

    page.chunks.forEach((chunk) => {
      if (
        !chunk.url.startsWith(page.url) ||
        new URL(chunk.url).href !== chunk.url
      ) {
        fail(
          `chunk '${chunk.id}' produced a url outside its page, or one a parser rewrites`,
        );
      }

      if (/<!--|-->/.test(chunk.content.replace(FENCED_CODE, " "))) {
        fail(
          `chunk '${chunk.id}' carries an HTML comment marker outside its fenced code`,
        );
      }
    });
  }

  return routes;
}

export function assertComponentCatalogJoin(routes) {
  if (!existsSync(COMPONENT_CATALOG_FILE)) {
    fail(`${COMPONENT_CATALOG_FILE} was not found`);
  }

  const catalog = JSON.parse(readFileSync(COMPONENT_CATALOG_FILE, "utf8"));
  const docsPaths = new Set(
    (catalog.components ?? [])
      .map((component) => component.docsPath)
      .filter((docsPath) => typeof docsPath === "string"),
  );

  if (docsPaths.size === 0) {
    fail(
      `${COMPONENT_CATALOG_FILE} declares no \`docsPath\` values — the join cannot be verified`,
    );
  }

  const unresolved = [...docsPaths]
    .filter((docsPath) => !routes.has(docsPath))
    .sort(byCodepoint);

  if (unresolved.length > 0) {
    fail(
      `${unresolved.length} of ${docsPaths.size} component \`docsPath\` values do not resolve to ` +
        `a page in this catalog: ${unresolved.join(", ")}`,
    );
  }

  return docsPaths.size;
}
