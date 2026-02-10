import { isTesting } from '@embroider/macros';

export const ROOT_ID = 'hds-icon-defs-root';
export const DEFS_ID = 'hds-icon-defs';

function buildHostMarkup(): string {
  // One hidden SVG element that hosts all <symbol> nodes under a <defs>.
  // This is intentionally "DOM-only" and not an Ember component so that consumers
  // don't need to mount anything in templates or call initializers manually.
  return `
<svg
  id="${ROOT_ID}"
  aria-hidden="true"
  focusable="false"
  style="position:absolute;width:0;height:0;overflow:hidden;left:-9999px;top:-9999px;"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs id="${DEFS_ID}"></defs>
</svg>
`.trim();
}

export function initialize() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (isTesting()) {
    const container = window.document?.getElementById('ember-testing');

    if (container && container.querySelector(`#${ROOT_ID}`) == null) {
      container.insertAdjacentHTML('afterbegin', buildHostMarkup());
    }
  } else {
    const container = window.document?.body;

    if (container && container.querySelector(`#${ROOT_ID}`) == null) {
      container.insertAdjacentHTML('beforeend', buildHostMarkup());
    }
  }
}

export default {
  initialize,
};
