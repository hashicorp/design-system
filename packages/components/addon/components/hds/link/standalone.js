import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_ICONPOSITION = 'leading';
export const DEFAULT_SIZE = 'medium';
export const ICONPOSITIONS = ['leading', 'trailing'];
export const SIZES = ['small', 'medium', 'large'];

export default class HdsLinkStandaloneComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the link. If no text value is defined an error will be thrown.
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Link::Standalone" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param linkUrl
   * @type {string|null}
   * @description The value for the href attribute.
   */
  get linkUrl() {
    let { linkUrl } = this.args;
    let { route } = this.args; // TODO not sure if I can/should do this?

    assert(
      `Either @linkUrl or @route must be defined for "Hds::Link::Standalone`,
      linkUrl || route !== undefined
    );

    return this.args.linkUrl;
  }

  /**
   * @param icon
   * @type {string|null}
   * @default null
   * @description The name of the icon to be used. An icon name must be defined.
   */
  get icon() {
    return this.args.icon ?? null;
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
      `@iconPosition for "Hds::Link::Standalone" must be one of the following: ${ICONPOSITIONS.join(
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
      `@size for "Hds::Link::Standalone" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );
    return size;
  }
  /**
   * @param sizeClass
   * @type {string}
   * @description Determines the CSS class that the standalone link should have, based on the size value; automatically set.
   */
  get sizeClass() {
    return `hds-link-standalone--size-${this.size}`;
  }
}
