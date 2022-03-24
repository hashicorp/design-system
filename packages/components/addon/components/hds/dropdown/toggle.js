import Component from '@glimmer/component';
// import { assert } from '@ember/debug';

export const BUTTON_DEFAULT_COLOR = 'primary';
export const BUTTON_COLORS = ['primary', 'secondary'];
export const MORE_DEFAULT_SIZE = 'medium';
export const MORE_SIZES = ['medium', 'small'];
export const ITEM_DEFAULT_COLOR = 'primary';
export const ITEM_COLORS = ['action', 'critical'];

export default class HdsDropdownToggleComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the button or value of `aria-label` if `isIconOnly` is set to `true`. If no text value is defined an error will be thrown.
   */
  get text() {
    let { text } = this.args;

    // TODO this depends on the variant?
    // assert(
    //   '@text for "Hds::Button" must have a valid value',
    //   text !== undefined
    // );

    return text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small`, `medium`, and `large`
   */
  get size() {
    // TODO this depends on the variant!!
    let { size = MORE_DEFAULT_SIZE } = this.args;

    // TODO this depends on the variant!!
    // assert(
    //   `@size for "Hds::Button" must be one of the following: ${SIZES.join(
    //     ', '
    //   )}; received: ${size}`,
    //   SIZES.includes(size)
    // );

    return size;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of button to be used; acceptable values are `primary`, `secondary`, and `critical`
   */
  get color() {
    // TODO this depends on the variant!!
    let { color = BUTTON_DEFAULT_COLOR } = this.args;

    // TODO this depends on the variant!!
    // assert(
    //   `@color for "Hds::Button" must be one of the following: ${COLORS.join(
    //     ', '
    //   )}; received: ${color}`,
    //   COLORS.includes(color)
    // );

    return color;
  }

  /**
   * @param iconSize
   * @type {string}
   * @default 16
   * @description ensures that the correct icon size is used. Automatically calculated.
   */
  get iconSize() {
    // TODO this depends on the variant!!
    if (this.args.size === 'small') {
      return '16';
    } else {
      return '24';
    }
  }

  /**
   * @param isDisabled
   * @type {boolean}
   * @default null
   * @description Sets the native HTML attribute `disabled` on the button element. Default is null (doesn't render the attribute).
   */
  get isDisabled() {
    return this.args.isDisabled ?? null;
  }

  /**
   * Get the class names to apply to the component.
   * @method Button#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  // "hds-button {{this.sizeClass}} {{this.colorClass}} {{this.widthClass}}"
  get toggleClassNames() {
    let classes = ['hds-dropdown-toggle'];

    // TODO probably this will need to be split
    // add a class based on the @toggle argument
    if (this.args.toggle) {
      classes.push(`hds-dropdown-toggle--${this.args.toggle}`);
    }

    // add a class based on the @size argument
    classes.push(`hds-dropdown-toggle--size-${this.size}`);

    return classes.join(' ');
  }
}
