import Component from '@glimmer/component';

import { guid } from '../utils/guid';
import { describedBy } from '../utils/describedby';

export default class HdsFormTextareaFieldComponent extends Component {
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
    // we just need a class for the layout
    let classes = ['hds-form-field--vertical-layout'];

    // add a class based on the @_contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args._contextualClass) {
      classes.push(this.args._contextualClass);
    }

    return classes.join(' ');
  }
}
