/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import HdsIcon from '../../icon/index.gts';
import { HdsAccordionSizeValues } from '../types.ts';

import type { HdsAccordionSizes } from '../types.ts';

export interface HdsAccordionItemButtonSignature {
  Args: {
    ariaLabel?: string;
    ariaLabelledBy?: string;
    contentId?: string;
    isOpen?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickToggle?: (event: MouseEvent, ...args: any[]) => void;
    parentContainsInteractive?: boolean;
    size?: HdsAccordionSizes;
    id?: string;
  };
  Element: HTMLButtonElement;
}

export default class HdsAccordionItemButton extends Component<HdsAccordionItemButtonSignature> {
  onClick = (event: MouseEvent): void => {
    if (this.args.onClickToggle) {
      this.args.onClickToggle(event);
    }
  };

  get iconSize() {
    return this.args.size === HdsAccordionSizeValues.Large ? '24' : '16';
  }

  get classNames() {
    const classes = ['hds-accordion-item__button'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-accordion-item__button--is-open');
    }

    // add a class based on the @size argument
    if (this.args.size) {
      classes.push(`hds-accordion-item__button--size-${this.args.size}`);
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

  <template>
    <button
      class={{this.classNames}}
      type="button"
      {{on "click" this.onClick}}
      aria-controls={{@contentId}}
      aria-expanded={{if @isOpen "true" "false"}}
      aria-label={{@ariaLabel}}
      aria-labelledby={{@ariaLabelledBy}}
      ...attributes
    >
      <HdsIcon @name="chevron-down" @size={{this.iconSize}} />
    </button>
  </template>
}
