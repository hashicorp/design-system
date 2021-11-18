import Component from '@glimmer/component';

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
   * @todo throw an error if no text is defined
   */
  get text() {
    return this.args.text;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the button; acceptable values are `small`, `medium`, and `large`
   * @todo throw an error if a size other than the acceptable values are used
   */
  get size() {
    return this.args.size ?? 'medium';
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
   * @todo throw an error if the allowed values are not used
   */
  get color() {
    return this.args.color ?? 'primary';
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
   * @todo make sure that an icon is also defined
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
   * @todo throw an error if the allowed values are not used
   */
  get type() {
    return this.args.type ?? 'button';
  }
}
