import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_TYPE = 'page';
export const TYPES = ['page', 'inline', 'compact', 'toast'];
export const DEFAULT_COLOR = 'neutral';
export const COLORS = [
  'neutral',
  'highlight',
  'success',
  'warning',
  'critical',
];
export const MAPPING_COLORS_TO_ICONS = {
  neutral: 'info',
  highlight: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  critical: 'alert-diamond',
};

export default class HdsAlertIndexComponent extends Component {
  constructor() {
    super(...arguments);

    assert(
      `you need to pass @title or @description to the "Hds::Alert" component`,
      !(this.args.title === undefined && this.args.description === undefined)
    );
  }

  /**
   * @param type
   * @type {enum}
   * @default page
   * @description Determines the type of the alert.
   */
  get type() {
    let { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Alert" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  /**
   * @param color
   * @type {enum}
   * @default neutral
   * @description Determines the color scheme for the alert.
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Alert" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param icon
   * @type {string}
   * @default null
   * @description The name of the icon to be used.
   */
  get icon() {
    let { icon } = this.args;

    // If `icon` isn't passed, use the pre-defined one from `color`
    if (icon === undefined) {
      if (this.type === 'compact') {
        // for the "compact" type by default we use filled icons
        return `${MAPPING_COLORS_TO_ICONS[this.color]}-fill`;
      } else {
        // for all the other types by default we use outlined icons
        return MAPPING_COLORS_TO_ICONS[this.color];
      }
      // If `icon` is set explicitly to false, user doesn't want any icon in the alert
    } else if (icon === false) {
      assert(
        `@icon for "Hds::Alert" with @type "compact" is required`,
        this.type !== 'compact'
      );

      return false;
    } else {
      // If a name for `icon` is passed, set FlightIcon to that name
      return icon;
    }
  }

  /**
   * @param onClose
   * @type {function}
   * @default () => {}
   */
  get onClose() {
    let { onClose } = this.args;

    if (typeof onClose === 'function') {
      return onClose;
    } else {
      return false;
    }
  }

  /**
   * @param iconSize
   * @type {string}
   * @description ensures that the correct icon size is used. Automatically calculated.
   */
  get iconSize() {
    if (this.type === 'compact') {
      return '16';
    } else {
      return '24';
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method Alert#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-alert'];

    // Add a class based on the @type argument
    classes.push(`hds-alert--type-${this.type}`);

    // Add an elevation to the "toast" alert
    if (this.type === 'toast') {
      classes.push(`hds-elevation-higher`);
    }

    // Add a class based on the @color argument
    classes.push(`hds-alert--color-${this.color}`);

    return classes.join(' ');
  }
}
