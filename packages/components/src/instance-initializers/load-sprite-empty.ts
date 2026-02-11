/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { isTesting } from '@embroider/macros';

export const ROOT_ID = 'flight-sprite-empty-container';
export const DEFS_ID = 'hds-icon-defs';

function buildHostMarkup(): string {
  // One hidden SVG element that hosts all <symbol> nodes under a <defs>.
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

export function initialize() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (isTesting()) {
    const container = window.document?.getElementById('ember-testing');

    if (container && !container.querySelector(`#${ROOT_ID}`)) {
      container.insertAdjacentHTML('afterbegin', buildHostMarkup());
    }
  } else {
    const container = window.document?.body;

    if (container && !container.querySelector(`#${ROOT_ID}`)) {
      container.insertAdjacentHTML('beforeend', buildHostMarkup());
    }
  }
}

export default {
  initialize,
};
