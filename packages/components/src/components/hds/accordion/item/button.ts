/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import type { HdsAccordionSizes } from '../types.ts';

interface HdsAccordionItemButtonSignature {
  Args: {
    ariaLabel?: string;
    contentId?: string;
    isOpen?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickToggle?: (event: MouseEvent, ...args: any[]) => void;
    parentContainsInteractive?: boolean;
    size?: HdsAccordionSizes;
  };
  Element: HTMLButtonElement;
}

export default class HdsAccordionItemButtonComponent extends Component<HdsAccordionItemButtonSignature> {
  @action
  onClick(event: MouseEvent): void {
    if (this.args.onClickToggle) {
      this.args.onClickToggle(event);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method ItemButton#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-accordion-item__button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-accordion-item__button--is-open');
    }

    if (this.args.parentContainsInteractive === false) {
      classes.push(
        'hds-accordion-item__button--parent-does-not-contain-interactive'
      );
    } else {
      classes.push('hds-accordion-item__button--parent-contains-interactive');
    }
    return classes.join(' ');
  }
}
