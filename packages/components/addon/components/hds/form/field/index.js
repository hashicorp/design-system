import Component from '@glimmer/component';

import { guid } from '../utils/guid';
import { describedBy } from '../utils/describedby';

export default class HdsFormFieldIndexComponent extends Component {
  /**
   * Sets the layout of the field
   *
   * @param layout
   * @type {enum}
   */
  get layout() {
    return this.args.layout;
  }

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
    let classes = [];

    if (this.args.layout) {
      classes.push(`hds-form-field--${this.layout}-layout`);
    }

    // add a class based on the @_contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args._contextualClass) {
      classes.push(this.args._contextualClass);
    }

    return classes.join(' ');
  }
}
