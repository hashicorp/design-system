/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { settled } from '@ember/test-helpers';

export async function waitForLayout(): Promise<void> {
  await new Promise((resolve) => requestAnimationFrame(resolve));

  return settled();
}
