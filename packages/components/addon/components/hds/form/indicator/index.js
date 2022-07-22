import Component from '@glimmer/component';

export default class HdsFormIndicatorIndexComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-indicator'];

    if (this.args.isOptional) {
      // add speficic class for "optional" indicator
      classes.push('hds-form-indicator--optional');

      // add typographic classes
      classes.push('hds-typography-body-100', 'hds-font-weight-regular');
    }

    return classes.join(' ');
  }
}
