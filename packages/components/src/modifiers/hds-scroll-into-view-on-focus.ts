/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';

export interface HdsScrollIntoViewOnFocusModifierSignature {
  Args: {
    Named: {
      options?: ScrollIntoViewOptions;
    };
  };
  Element: HTMLElement;
}

const DEFAULT_OPTIONS: ScrollIntoViewOptions = {
  block: 'nearest',
  inline: 'nearest',
};

const hdsScrollIntoViewOnFocus =
  modifier<HdsScrollIntoViewOnFocusModifierSignature>(
    (element, _positional, named) => {
      const scrollOptions = named.options ?? DEFAULT_OPTIONS;

      const onFocus = (): void => {
        element.scrollIntoView(scrollOptions);
      };

      element.addEventListener('focus', onFocus);

      return () => {
        element.removeEventListener('focus', onFocus);
      };
    }
  );

export default hdsScrollIntoViewOnFocus;
