import Component from '@glimmer/component';

export default class HdsTabsIndexComponent extends Component {
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
    let classes = ['hds-tabs'];

    // add a class based on the @xxx argument
    // classes.push(`hds-tabs--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
