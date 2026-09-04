/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// assembles one page record: its frontmatter fields, and every chunk the page yields

import { assemblePage } from "./assembly.mjs";
import {
  headingTrailFor,
  splitHeadings,
  splitTabs,
} from "./chunks.mjs";
import { readStringList, readText, readSubMap } from "./frontmatter.mjs";
import { chunkIdFor, githubHeaderId, tabQuery } from "./identifiers.mjs";
import { SITE_BASE_URL, byCodepoint, fail } from "./paths.mjs";
import { ALGOLIA_IGNORE_MARKER, toSearchText } from "./search-text.mjs";

function buildChunks(route, pageUrl, units) {
  const anchorCounts = new Map();
  const idCounts = new Map();
  const records = [];

  for (const [unitIndex, unit] of units.entries()) {
    const query = tabQuery(unit.tab, unitIndex);
    const parts = splitHeadings(unit.content);

    for (const [index, part] of parts.entries()) {
      const anchor =
        part.heading === undefined
          ? ""
          : githubHeaderId(part.heading, anchorCounts);

      const hasDescendant =
        part.body === "" &&
        parts[index + 1] !== undefined &&
        parts[index + 1].level > part.level;

      if (part.body === "" && (part.heading === undefined || hasDescendant)) {
        continue;
      }

      const trail = headingTrailFor(parts, index);
      const content =
        part.heading === undefined
          ? part.body
          : `${"#".repeat(part.level)} ${part.heading}\n\n${part.body}`.trim();
      const symbols = new Set();
      const text = toSearchText(content, symbols);

      let id = chunkIdFor(route, unit.tab, trail);

      const seen = idCounts.get(id);

      idCounts.set(id, (seen ?? 0) + 1);

      if (seen !== undefined) {
        id = `${id}~${seen + 1}`;
      }

      const record = { id };

      record.tab = unit.tab;

      if (trail.length > 0) {
        record.headingTrail = trail;
      }

      if (part.level > 0) {
        record.level = part.level;
      }

      record.url = `${pageUrl}${query}${anchor === "" ? "" : `#${encodeURI(anchor)}`}`;
      record.content = content.replace(ALGOLIA_IGNORE_MARKER, "").trim();
      record.text = text;

      if (symbols.size > 0) {
        record.symbols = [...symbols].sort(byCodepoint);
      }

      records.push(record);
    }
  }
  return records;
}

export function buildPage(file, route, data, body) {
  const title = readText(data.title);

  if (title === undefined) {
    fail(`${route} has no \`title\` in its frontmatter`);
  }

  const units = splitTabs(route, assemblePage(file, body));
  const pageUrl = `${SITE_BASE_URL}${route}`;

  const page = { route, section: route.split("/")[0], title };

  page.caption = readText(data.caption);
  page.description = readText(data.description);
  page.keywords = readStringList(data.navigation?.keywords ?? data.keywords);
  page.related = readStringList(data.related);
  page.links = readSubMap(data.links, ["github", "figma"]);
  page.status = readSubMap(data.status, ["added", "updated", "deprecated"]);
  page.url = pageUrl;
  page.chunks = buildChunks(route, pageUrl, units);

  return page;
}
