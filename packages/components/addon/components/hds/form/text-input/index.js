import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guid } from '../utils/guid';
import { describedBy } from '../utils/describedby';

// notice: we don't support all the possible HTML types, only a subset
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
export const DEFAULT_TYPE = 'text';
export const TYPES = [
  'text',
  'email',
  'password',
  'date',
  'time',
  'url',
  'search',
];

export default class HdsFormTextInputIndexComponent extends Component {
  /**
   * Sets the type of input
   *
   * @param type
   * @type {string}
   * @default 'text'
   */
  get type() {
    let { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Form::TextInput" must be one of the following: ${TYPES.join(
        ', '
      )}, received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  /**
   * Calculates the unique ID to assign to the form control
   */
  get id() {
    // TODO! discuss with ALex Jurubita: we may need to accept an @id (or @fieldId/@controlId) argument, in case the consumers need to pass a specific/pre-defined ID for some reasons
    return guid(this);
  }

  /**
   * Get the array of IDs for elements that relate to this form control.
   * @method ariaDescribedBy
   * @return {string} The "aria-describedby" attribute to apply to the component.
   */
  get ariaDescribedBy() {
    return describedBy(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-form-text-input'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-regular');

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-text-input--is-invalid`);
    }

    return classes.join(' ');
  }
}
