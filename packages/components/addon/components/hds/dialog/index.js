import Component from '@glimmer/component';

export default class HdsDialogIndexComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dialog'];

    // add a class based on the @xxx argument
    // classes.push(`hds-dialog--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
