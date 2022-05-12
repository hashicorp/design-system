import Component from '@glimmer/component';

export default class HdsFormSelectIndexComponent extends Component {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor() {
  //   super(...arguments);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-select'];

    // add a class based on the @xxx argument
    // classes.push(`hds-form-select--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
