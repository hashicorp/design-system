/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

export interface HdsFormToggleBaseSignature {
  Args: {
    value?: string;
  };
  Element: HTMLInputElement;
}

export default class HdsFormToggleBase extends Component<HdsFormToggleBaseSignature> {
  private _syncAriaChecked = modifier((element: HTMLInputElement) => {
    const syncAriaChecked = () => {
      const checkedValue = element.getAttribute('checked');
      let ariaCheckedValue: 'true' | 'false';

      if (checkedValue === 'mixed') {
        ariaCheckedValue = 'false';
      } else {
        ariaCheckedValue = element.checked ? 'true' : 'false';
      }

      element.setAttribute('aria-checked', ariaCheckedValue);
    };

    syncAriaChecked();

    const observer = new MutationObserver(syncAriaChecked);
    observer.observe(element, {
      attributes: true,
      attributeFilter: ['checked'],
    });

    element.addEventListener('change', syncAriaChecked);

    return () => {
      observer.disconnect();
      element.removeEventListener('change', syncAriaChecked);
    };
  });

  <template>
    <div class="hds-form-toggle">
      <input
        class="hds-form-toggle__control"
        type="checkbox"
        ...attributes
        value={{@value}}
        role="switch"
        {{this._syncAriaChecked}}
      />
      <div class="hds-form-toggle__facade"></div>
    </div>
  </template>
}
