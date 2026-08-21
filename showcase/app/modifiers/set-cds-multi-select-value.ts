/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';

interface SetCdsMultiSelectValueSignature {
  Element: Element & { value?: string };
  Args: {
    Positional: [string];
  };
}

// `cds-multi-select`'s `connectedCallback` recomputes `value` by scanning its
// slotted `cds-multi-select-item[selected]` children the moment it connects
// to the DOM. If the children haven't been fully inserted yet at that point,
// the scan comes up empty and the initial selection is lost. Re-applying
// `value` here (after the whole subtree has been inserted) forces Carbon's
// internal sync logic to run again with the correct, complete set of items.
export default modifier<SetCdsMultiSelectValueSignature>((element, [value]) => {
  element.value = value;
});
