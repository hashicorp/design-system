import { guidFor } from '@ember/object/internals';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

function getElementId(element) {
  // use @id arg, if provided
  if (element.args.id) {
    return element.args.id;
  }

  // otherwise, generate and memoize a guid
  if (!element._id) {
    element._id = guidFor(element);
  }
  return element._id;
}

export { getElementId };
//# sourceMappingURL=hds-get-element-id.js.map
