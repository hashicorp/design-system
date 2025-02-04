/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { tabbable } from 'tabbable';

export const onFocusTrapDeactivate = (cell: HTMLDivElement) => {
  const cellTabbableChildren = tabbable(cell);

  for (const child of cellTabbableChildren) {
    child.setAttribute('tabindex', '-1');
  }

  cell.setAttribute('tabindex', '0');
};
