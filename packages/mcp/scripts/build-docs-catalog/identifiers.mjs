/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// the two naming schemes a chunk needs: our own stable id, and the anchor the live site uses
function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function rawHeaderId(heading) {
  return (
    heading
      .replace(/ /g, "-")
      .replace(/&amp;/g, "")
      // eslint-disable-next-line no-useless-escape
      .replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "")
      .toLowerCase()
  );
}

export function githubHeaderId(heading, counts) {
  const id = rawHeaderId(heading);
  const seen = counts.get(id);

  counts.set(id, (seen ?? 0) + 1);

  return seen === undefined ? id : `${id}-${seen}`;
}

// the first tab of a page carries no query param, `website/app/controllers/show.js`
export function tabQuery(tab, index) {
  if (tab === undefined || index === 0) {
    return "";
  }

  return `?tab=${encodeURIComponent(tab.toLowerCase())}`;
}

export function chunkIdFor(route, tab, trail) {
  const segments = tab === undefined ? [] : [slugify(tab)];

  for (const heading of trail) {
    segments.push(slugify(heading));
  }

  const fragment = segments.filter((segment) => segment !== "").join("/");

  return fragment === "" ? route : `${route}#${fragment}`;
}
