import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class FlightIconComponent extends Component {
  /**
   * Sets the fillColor for the SVG
   *
   * @param fillColor {string}
   * @default 'currentColor'
   */
  get fillColor() {
    return this.args.fillColor ?? 'currentColor';
  }

  /**
   * Generates a unique ID for the SVG
   *
   * @param iconId
   */
  iconId = 'icon-' + guidFor(this);

  /**
   * Indicates which icon should be used
   *
   * @param iconName {undefined|string}
   * @default null
   */
  get name() {
    return this.args.name ?? null;
  }

  /**
   * Determines the icon's `display` property
   *
   * @param display
   * @returns the value of `isInlineBlock` if set
   * @default true
   */
  get display() {
    return this.args.isInlineBlock ?? true;
  }

  /**
   * Gets the icon's size (small or large)
   *
   * @param size
   * @returns the value of `size` if set
   * @default `large`
   */
  get size() {
    return this.args.size ?? 'large';
  }

  get sizeNum() {
    const sizeMap = {
      small: 16,
      large: 24,
    };

    let defaultSize = 'large';
    let sizeNum;

    if (this.args.size && sizeMap[this.args.size]) {
      sizeNum = sizeMap[this.args.size];
    } else {
      sizeNum = sizeMap[defaultSize];
    }

    return sizeNum;
  }
}
