import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const DEFAULT_SIZE = 'medium';
const DEFAULT_COLOR = 'primary';
const DEFAULT_TYPE = 'button';
const SIZES = ['small', 'medium', 'large'];
const TYPES = ['button', 'submit', 'reset'];
const COLORS = ['primary', 'secondary', 'critical', 'ghost'];

export default class HdsButtonIndexComponent extends Component {
  /**
   * @param isIconOnly
   * @type {boolean}
   * @default false
   * @description Indicates if the button will only contain an icon; ensures a11y
   */
  get isIconOnly() {
    return this.args.isIconOnly ?? false;
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the button or value of `aria-label` if `isIconOnly` is set to `true`
   */
  get text() {
    let text = '';

    if (text) {
      assert(`@text must not be an empty string`);
    }
    return this.args.text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small`, `medium`, and `large`
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    if (size) {
      assert(
        `@size for ${this.toString()} must be one of the following: ${SIZES.join(
          ', '
        )}, received: ${size}`,
        SIZES.includes(size)
      );
    }

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
   * @description Determines the color of button to be used; acceptable values are `primary`, `secondary`, `destructive`, and `ghost`
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    if (color) {
      assert(
        `@color for ${this.toString()} must be one of the following: ${COLORS.join(
          ', '
        )}, received: ${color}`,
        COLORS.includes(color)
      );
    }

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
   * @description The name of the icon to be used
   */
  get icon() {
    return this.args.icon ?? null;
  }

  /**
   * @param iconPos
   * @type {string}
   * @default leading
   * @description Allows the user to set the position of the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPos() {
    return this.args.iconPos ?? 'leading';
  }

  /**
   * @param iconSize
   * @type {string}
   * @default null
   * @description ensures that the correct icon size is used. Automatically calculated.
   */
  get iconSize() {
    if (this.args.size === 'large') {
      return '24';
    } else {
      return null;
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

    if (type) {
      assert(
        `@type for ${this.toString()} must be one of the following: ${TYPES.join(
          ', '
        )}, received: ${type}`,
        TYPES.includes(type)
      );
    }

    return type;
  }
}
