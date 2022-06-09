import Component from '@glimmer/component';

export default class HdsFormToggleBaseComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-toggle'];

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-toggle--is-invalid`);
    }

    // add a class based on the @_wrapperClass argument
    // we need to use this special argument to pass a class to the wrapping element, because the ...attributes is applied to the control
    // notice: this will *not* be documented for public use
    // the reason for this is that the spread (...) of attributes is applied to the <input> element, but the component has a wrapping container and we need to pass a class to it
    if (this.args._wrapperClass) {
      classes.push(this.args._wrapperClass);
    }

    return classes.join(' ');
  }
}
