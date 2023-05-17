/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { guidFor } from '@ember/object/internals';

export function getElementId(element) {
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
