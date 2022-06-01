import Component from '@glimmer/component';

export default class HdsFormLabelIndexComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-label'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-semibold');

    // add a class based on the @xxx argument
    // classes.push(`hds-form-label--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
