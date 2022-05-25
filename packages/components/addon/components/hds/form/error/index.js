import Component from '@glimmer/component';
export const ERROR_ID_PREFIX = 'error-';

export default class HdsFormErrorIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  /**
   * Determines the unique ID to assign to the element
   * @method id
   * @return {string} The "id" attribute to apply to the element.
   */
  get id () {
    let { fieldId } = this.args;
    if (fieldId) {
      return `${ERROR_ID_PREFIX}${fieldId}`;
    }
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
