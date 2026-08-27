/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// cuts an assembled page into the units the catalog indexes: tab sections, then headings

import { ATX_HEADING, CODE_FENCE } from "./markdown.mjs";
import { fail } from "./paths.mjs";

const TAB_SECTION = /<section data-tab="(.*?)">([\s\S]*?)<\/section>/g;

export const EXCLUDED_TABS = new Set(["Version history"]);

export function splitTabs(route, content) {
  const units = [];

  for (const [, tab, body] of content.matchAll(TAB_SECTION)) {
    units.push({ tab: tab.trim(), content: body });
  }

  if (units.length === 0) {
    return [{ tab: undefined, content }];
  }

  const outside = content.replace(TAB_SECTION, "").trim();

  if (outside !== "") {
    fail(
      `${route}: content sits outside every tab section, starting '${outside.slice(0, 80)}'`,
    );
  }

  return units;
}

export function splitHeadings(unitContent) {
  const chunks = [];

  let current = { level: 0, heading: undefined, lines: [] };
  let fenced = false;

  for (const line of unitContent.split("\n")) {
    if (CODE_FENCE.test(line)) {
      fenced = !fenced;
    }

    const heading = fenced ? null : ATX_HEADING.exec(line);

    if (heading === null) {
      current.lines.push(line);

      continue;
    }

    chunks.push(current);

    current = { level: heading[1].length, heading: heading[2], lines: [] };
  }

  chunks.push(current);

  return chunks.map(({ level, heading, lines }) => ({
    level,
    heading,
    body: lines.join("\n").trim(),
  }));
}

// walks back through shallower headings to build the breadcrumb
export function headingTrailFor(chunks, index) {
  const trail = [];

  let level = chunks[index].level;

  for (let position = index; position >= 0 && level > 0; position -= 1) {
    const candidate = chunks[position];

    if (candidate.heading === undefined || candidate.level > level) {
      continue;
    }

    trail.unshift(candidate.heading);

    level = candidate.level - 1;
  }

  return trail;
}
