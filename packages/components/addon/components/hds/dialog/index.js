import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_SIZE = 'regular';
export const SIZES = ['small', 'regular', 'large'];

export default class HdsDialogIndexComponent extends Component {
  /**
   * Sets the size of the dialog
   * Accepted values: small, regular, large
   *
   * @param type
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
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dialog'];

    // add a class based on the @size argument
    classes.push(`hds-dialog--size-${this.size}`);

    return classes.join(' ');
  }
}
