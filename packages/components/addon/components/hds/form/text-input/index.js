import Component from '@glimmer/component';
import { guid } from '../utils/guid';

export default class HdsFormTextInputIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  /**
   * Sets the type of input
   *
   * @param type
   * @type {string}
   * @default 'text'
   */
  get type() {
    return this.args.type ?? 'text';
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
    let describedBy = [];
    describedBy.push(`helper-text-${this.id}`);
    describedBy.push(`error-${this.id}`);
    return describedBy.join(' ');
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-text-input'];

    // add a class based on the @xxx argument
    // classes.push(`hds-form-text-input--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
