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

  get id() {
    return guid(this);
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
