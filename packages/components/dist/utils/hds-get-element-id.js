import { guidFor } from '@ember/object/internals';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getElementId(element) {
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

export { getElementId };
//# sourceMappingURL=hds-get-element-id.js.map
