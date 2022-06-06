import Component from '@glimmer/component';

import { guid } from '../utils/guid';
import { describedBy } from '../utils/describedby';

export default class HdsFormCheckboxIndexComponent extends Component {
  /**
   * Calculates the unique ID to assign to the form control
   */
  get id() {
    return guid(this);
  }

  /**
   * Get the array of IDs for elements that relate to this form control.
   * @method ariaDescribedBy
   * @return {string} The "aria-describedby" attribute to apply to the component.
   */
  get ariaDescribedBy() {
    return describedBy(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-checkbox'];

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-checkbox--is-invalid`);
    }

    return classes.join(' ');
  }
}
