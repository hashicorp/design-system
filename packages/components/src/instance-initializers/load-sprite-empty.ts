/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { isTesting } from '@embroider/macros';

export const ROOT_ID = 'flight-sprite-empty-container';

function buildHostMarkup(): string {
  // One hidden SVG element that hosts all <symbol> nodes
  // This is intentionally "DOM-only" and not an Ember component so that consumers
  // don't need to mount anything in templates or call initializers manually.
  return `
<svg
  id="${ROOT_ID}"
  class="flight-sprite-container"
  aria-hidden="true"
  focusable="false"
  xmlns="http://www.w3.org/2000/svg"
>
</svg>
`.trim();
}

// Returns the sprite root, adding it first if it's missing. The icon registry also calls
// this, as the root can be gone by the time icons load: with `@ember/test-helpers` 5.6+
// on Ember 6.12.1+, rendering tests clear `#ember-testing` after this initializer runs.
export function insertSpriteRoot(): SVGSVGElement | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  // in tests, the root goes inside `#ember-testing` so Percy snapshots include it
  const container = isTesting()
    ? window.document?.getElementById('ember-testing')
    : window.document?.body;

  if (!container) {
    return null;
  }

  if (!container.querySelector(`#${ROOT_ID}`)) {
    container.insertAdjacentHTML(
      isTesting() ? 'afterbegin' : 'beforeend',
      buildHostMarkup()
    );
  }

  return container.querySelector<SVGSVGElement>(`#${ROOT_ID}`);
}

export function initialize() {
  insertSpriteRoot();
}

export default {
  initialize,
};
