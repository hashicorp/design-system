import Component from '@glimmer/component';
export const ID_PREFIX = 'error-';

export default class HdsFormErrorIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  /**
   * Determines the unique ID to assign to the element
   * @method id
   * @return {(string|boolean)} The "id" attribute to apply to the element or false, if no fieldId is provided
   */
  get id() {
    let { fieldId } = this.args;
    if (fieldId) {
      return `${ID_PREFIX}${fieldId}`;
    }
    return false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-error'];

    // add a class based on the @xxx argument
    // classes.push(`hds-form-error--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
