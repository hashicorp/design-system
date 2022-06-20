import Component from '@glimmer/component';

export default class HdsFormCheckboxBaseComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-checkbox'];

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-checkbox--is-invalid`);
    }

    return classes.join(' ');
  }
}
