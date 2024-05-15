/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

interface ToggleButtonSignature {
  Args: {
    isOpen: unknown;
    text: unknown;
  };
  Element: HTMLElement;
}

export default class ToggleButtonComponent extends Component<ToggleButtonSignature> {
  /**
   * Get the class names to apply to the component.
   * @method ToggleButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-reveal__toggle-button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-reveal__toggle-button--is-open');
    }

    return classes.join(' ');
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Toggle::Button': typeof ToggleButtonComponent;
    'toggle/button': typeof ToggleButtonComponent;
  }
}
