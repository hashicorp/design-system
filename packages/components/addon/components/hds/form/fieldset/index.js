/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getElementId } from '@hashicorp/design-system-components/utils/hds-get-element-id';
import { setAriaDescribedBy } from '@hashicorp/design-system-components/utils/hds-set-aria-described-by';

export default class HdsFormFieldsetIndexComponent extends Component {
  @tracked ariaDescribedBy = this.args.extraAriaDescribedBy;
  @tracked descriptors = [];

  @action
  appendDescriptor(element) {
    this.descriptors.push(element.id);
  }

  @action
  setAriaDescribedBy() {
    setAriaDescribedBy(this);
  }

  /**
   * Sets the layout of the group
   *
   * @param layout
   * @type {enum}
   * @default 'vertical'
   */
  get layout() {
    return this.args.layout ?? 'vertical';
  }

  /**
   * Calculates the unique ID to assign to the fieldset
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
    // we just need a class for the layout
    let classes = ['hds-form-group'];

    // add a class based on the @layout argument
    classes.push(`hds-form-group--layout-${this.layout}`);

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
