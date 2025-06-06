/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { ComponentLike } from '@glint/template';

import type { HdsLayoutFlexItemSignature } from '../../../layout/flex/item.ts';

// Q: I want to hardcode the @tag for this component to 'div'. So should I need to import `AvailableTagNames`?
// (The linter says I should, but it doesn't make sense to me if I just want to use a div.)
import type { AvailableElements } from '../../../layout/flex/types.ts';

export interface HdsFormSectionFieldGroupSignature {
  Args: {
    wrap?: boolean; // Whether the field group should wrap its contents
  };
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsLayoutFlexItemSignature>;
      },
    ];
  };
  Element: AvailableElements; // Was: HTMLDivElement
}

export default class HdsFormSectionFieldGroup extends Component<HdsFormSectionFieldGroupSignature> {
  get classNames(): string {
    const classes = ['hds-form__section-field-group'];

    // add a class based on the @xxx argument
    // classes.push(`hds-form-field-group--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
