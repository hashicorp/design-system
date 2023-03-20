import Component from '@glimmer/component';

export default class HdsApplicationStateIndexComponent extends Component {
  get errorCode() {
    return this.args.errorCode || null;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-application-state'];

    // add a class based on the existence of @errorCode argument
    if (this.errorCode !== null) {
      classes.push(`hds-application-state--error`);
    }

    return classes.join(' ');
  }
}
