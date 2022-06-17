import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { getElementId } from '../utils/getElementId';
import { getAriaDescribedBy } from '../utils/getAriaDescribedBy';

export const LAYOUT_TYPES = ['vertical', 'flag'];

export default class HdsFormFieldIndexComponent extends Component {
  @tracked ariaDescribedBy;
  @tracked descriptors = [];

  @action
  appendDescriptor(element) {
    this.descriptors.push(element.id);
    this.ariaDescribedBy = getAriaDescribedBy(this);
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
      `@type for "Hds::Form::Field" must be one of the following: ${LAYOUT_TYPES.join(
        ', '
      )}, received: ${layout}`,
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
}
