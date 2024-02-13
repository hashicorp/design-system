/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export function setAriaDescribedBy(element) {
  // append @extraAriaDescribedBy arg, if provided
  if (element.args.extraAriaDescribedBy) {
    element.descriptors.push(element.args.extraAriaDescribedBy);
  }

  if (element.descriptors.length) {
    element.ariaDescribedBy = element.descriptors.join(' ');
  }
}
