import Component from '@glimmer/component';
export const ID_PREFIX = 'error-';

export default class HdsFormErrorIndexComponent extends Component {
  /**
   * Determines the unique ID to assign to the element
   * @method id
   * @return {(string|boolean)} The "id" attribute to apply to the element or false, if no controlId is provided
   */
  get id() {
    let { controlId } = this.args;
    if (controlId) {
      return `${ID_PREFIX}${controlId}`;
    }
    return false;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-error'];

    // add typographic classes
    classes.push('hds-typography-body-100', 'hds-font-weight-medium');

    // add a class based on the @_contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args._contextualClass) {
      classes.push(this.args._contextualClass);
    }

    return classes.join(' ');
  }
}
