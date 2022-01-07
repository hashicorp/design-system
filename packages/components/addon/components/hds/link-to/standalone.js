import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_ICONPOSITION = 'leading';
export const DEFAULT_COLOR = 'primary';
export const DEFAULT_SIZE = 'medium';
export const ICONPOSITIONS = ['leading', 'trailing'];
export const COLORS = ['primary', 'secondary'];
export const SIZES = ['small', 'medium', 'large'];

export default class HdsLinkToStandaloneComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the link. If no text value is defined an error will be thrown.
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::LinkTo::Standalone" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param route
   * @type {string|null}
   * @description Checks to make sure route is defined.
   */
  get route() {
    let { route } = this.args;
    assert(
      '@route must be defined for "Hds::LinkTo::Standalone"',
      route !== undefined
    );

    return route;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::LinkTo::Standalone" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param icon
   * @type {string|null}
   * @default null
   * @description The name of the icon to be used. An icon name must be defined.
   */
  get icon() {
    let { icon } = this.args;

    assert(
      '@icon for "Hds::LinkTo::Standalone" must have a valid value',
      icon !== undefined
    );

    return icon;
  }

  /**
   * @param iconPosition
   * @type {string}
   * @default leading
   * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
   */
  get iconPosition() {
    let { iconPosition = DEFAULT_ICONPOSITION } = this.args;

    assert(
      `@iconPosition for "Hds::LinkTo::Standalone" must be one of the following: ${ICONPOSITIONS.join(
        ', '
      )}; received: ${iconPosition}`,
      ICONPOSITIONS.includes(iconPosition)
    );

    return iconPosition;
  }

  /**
   * @param size
   * @type {string}
   * @default medium
   * @description The size of the standalone link; acceptable values are `small`, `medium`, and `large`
   */
  get size() {
    let { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::LinkTo::Standalone" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
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

  // this is a workaround for https://github.com/emberjs/ember.js/issues/19693
  // don't remove until we drop support for ember 3.27 and 3.28
  get queryParams() {
    if (this.args.query) {
      return this.args.query;
    } else {
      return {};
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method LinkToStandalone#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    // Notice: we've left this class name the same as the hds::link::standalone (we didn't add the "-to") so we didn't have to replicate the CSS
    let classes = ['hds-link-standalone'];

    // add a class based on the @size argument
    classes.push(`hds-link-standalone--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-link-standalone--color-${this.color}`);

    return classes.join(' ');
  }
}
