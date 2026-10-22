/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { click, settled } from '@ember/test-helpers';

export async function waitForLayout(): Promise<void> {
  await new Promise((resolve) => requestAnimationFrame(resolve));

  return settled();
}

export async function performContextMenuAction(th: Element, key: string) {
  const contextMenuToggle = th.querySelector('.hds-dropdown-toggle-icon');

  if (contextMenuToggle === null) {
    throw new Error('expected the header cell to render a context menu toggle');
  }

  await click(contextMenuToggle);

  return click(`[data-test-context-option-key="${key}"]`);
}
