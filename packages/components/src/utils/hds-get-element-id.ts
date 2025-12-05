/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { guidFor } from '@ember/object/internals';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getElementId(element: any): string {
  // use @id arg, if provided
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (element.args.id) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return element.args.id;
  }

  // otherwise, generate and memoize a guid
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!element._id) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    element._id = guidFor(element);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return element._id;
}
