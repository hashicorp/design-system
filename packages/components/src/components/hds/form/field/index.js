/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { getElementId } from '@hashicorp/design-system-components/utils/hds-get-element-id';
import { setAriaDescribedBy } from '@hashicorp/design-system-components/utils/hds-set-aria-described-by';

export const LAYOUT_TYPES = ['vertical', 'flag'];

export default class HdsFormFieldIndexComponent extends Component {
  @tracked ariaDescribedBy = this.args.extraAriaDescribedBy;
  @tracked descriptors = [];

  @action
  appendDescriptor(element) {
    this.descriptors.push(element.id);
  }

  @action
  setAriaDescribedBy() {
    // we schedule this afterRender to capture all descriptors registered onInsert
    schedule('afterRender', () => {
      setAriaDescribedBy(this);
    });
  }

  /**
   * Sets the layout of the field
   *
   * @param layout
   * @type {string}
   */
  get layout() {
    let { layout } = this.args;

    assert(
      `@layout for "Hds::Form::Field" must be one of the following: ${LAYOUT_TYPES.join(
        ', '
      )}; received: ${layout}`,
      LAYOUT_TYPES.includes(layout)
    );

    return layout;
  }

  /**
   * Calculates the unique ID to assign to the form control
   */
  get id() {
    return getElementId(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [];

    if (this.args.layout) {
      classes.push(`hds-form-field--layout-${this.layout}`);
    }

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }

    return classes.join(' ');
  }

  /**
   * @param isRequired
   * @type {boolean}
   * @default false
   */
  get isRequired() {
    return this.args.isRequired || false;
  }

  /**
   * @param isOptional
   * @type {boolean}
   * @default false
   */
  get isOptional() {
    return this.args.isOptional || false;
  }
}
