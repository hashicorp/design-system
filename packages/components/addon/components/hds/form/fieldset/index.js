import Component from '@glimmer/component';

import { getElementId } from '../utils/getElementId';
import { getAriaDescribedBy } from '../utils/getAriaDescribedBy';

export default class HdsFormFieldsetIndexComponent extends Component {
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
   * Get the array of IDs for elements that relate to this fieldset.
   * @method ariaDescribedBy
   * @return {string} The "aria-describedby" attribute to apply to the component.
   */
  get ariaDescribedBy() {
    return getAriaDescribedBy(this);
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
}
