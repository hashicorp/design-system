/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';

interface SetCdsIconSignature {
  Element: Element & { icon?: unknown };
  Args: {
    Positional: [unknown];
  };
}

export default modifier<SetCdsIconSignature>((element, [icon]) => {
  element.icon = icon;
});
