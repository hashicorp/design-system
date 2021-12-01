import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_SIZE = 'medium';
export const DEFAULT_COLOR = 'primary';
export const DEFAULT_TYPE = 'button';
export const SIZES = ['small', 'medium', 'large'];
export const COLORS = ['primary', 'secondary', 'destructive'];
export const TYPES = ['button', 'submit', 'reset'];

export default class HdsButtonIndexComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the button or value of `aria-label` if `isIconOnly` is set to `true`. If no text value is defined an error will be thrown.
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Button" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small`, `medium`, and `large`
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Button" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * @param sizeClass
   * @type {string}
   * @default hds-button--size-medium
   * @description Determines the CSS class that the button should have, based on the size value; automatically set.
   */
  get sizeClass() {
    return `hds-button--size-${this.size}`;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of button to be used; acceptable values are `primary`, `secondary`, and `destructive`
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Button" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param colorClass
   * @type {string}
   * @default hds-button--color-primary
   * @description Determines the CSS class that the button should have, based on the color value; automatically set
   */
  get colorClass() {
    return `hds-button--color-${this.color}`;
  }

  /**
   * @param icon
   * @type {string}
   * @default null
   * @description The name of the icon to be used.
   */
  get icon() {
    return this.args.icon ?? null;
  }

  /**
   * @param isIconOnly
   * @type {boolean}
   * @default false
   * @description Indicates if the button will only contain an icon; component will also ensure that accessible text is still applied to the component.
   */
  get isIconOnly() {
    if (this.icon) {
      return this.args.isIconOnly ?? false;
    }
    return false;
  }

  /**
   * @param iconPos
   * @type {string}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPos() {
    return this.args.iconPos ?? 'leading';
  }

  /**
   * @param iconSize
   * @type {string}
   * @default 16
   * @description ensures that the correct icon size is used. Automatically calculated.
   */
  get iconSize() {
    if (this.args.size === 'large') {
      return '24';
    } else {
      return '16';
    }
  }

  /**
   * @param type
   * @type {string}
   * @default button
   * @description The value for the button's `type` attribute. Acceptable values are `button`, `submit`, and `reset`
   */
  get type() {
    let { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Button" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  /**
   * @param isFullWidth
   * @type {boolean}
   * @default false
   * @description Indicates that a button should take up the full width of the parent container. The default is false.
   */
  get isFullWidth() {
    return this.args.isFullWidth ?? false;
  }

  /**
   * @param widthClass
   * @type {string|null}
   * @default null
   * @description Determines if the full-width class should be applied to the component. This is set automatically based on the value of `isFullWidth`.
   */
  get widthClass() {
    if (this.isFullWidth === true) {
      return 'hds-button--width-full';
    } else {
      return null;
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
}
