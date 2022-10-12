import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_SIZE = 'regular';
export const DEFAULT_TYPE = 'neutral';
export const SIZES = ['small', 'regular', 'large'];
export const TYPES = ['neutral', 'warning', 'critical'];

export default class HdsDialogIndexComponent extends Component {
  /**
   * Sets the size of the dialog
   * Accepted values: small, regular, large
   *
   * @param size
   * @type {string}
   * @default 'regular'
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Dialog" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * Sets the type of the dialog
   * Accepted values: neutral, warning, critical
   *
   * @param type
   * @type {string}
   * @default 'neutral'
   */
  get type() {
    let { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Dialog" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dialog'];

    // add a class based on the @size argument
    classes.push(`hds-dialog--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-dialog--type-${this.type}`);

    return classes.join(' ');
  }
}
