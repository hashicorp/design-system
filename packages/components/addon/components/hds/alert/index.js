import Component from '@glimmer/component';
import { assert } from '@ember/debug';

const NOOP = () => {};

export const DEFAULT_TYPE = 'page';
export const TYPES = ['page', 'inline', 'compact', 'toast'];
export const DEFAULT_COLOR = 'neutral';
export const COLORS = [
  'critical',
  'warning',
  'neutral',
  'highlight',
  'success',
];
export const MAPPING_COLORS_TO_ICONS = {
  critical: 'alert-octagon',
  warning: 'alert-triangle',
  neutral: 'info',
  highlight: 'info',
  success: 'check-circle',
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

    if (icon === '') {
      return icon;
    } else {
      return icon || MAPPING_COLORS_TO_ICONS[this.color];
    }
  }

  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  get onDismiss() {
    let { onDismiss } = this.args;

    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return NOOP;
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

    // Add a class based on the @color argument
    classes.push(`hds-alert--color-${this.color}`);

    return classes.join(' ');
  }
}
