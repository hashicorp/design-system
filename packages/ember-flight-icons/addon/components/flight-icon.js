import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

export default class FlightIconComponent extends Component {
  get contextRootURL() {
    const config = getOwner(this).resolveRegistration('config:environment');
    return config.rootURL || '/';
  }

  /**
   * Sets the color for the SVG
   *
   * @param color {string}
   * @default 'currentColor'
   */
  get color() {
    return this.args.color ?? 'currentColor';
  }

  /**
   * Generates a unique ID for the SVG
   *
   * @param iconId
   */
  iconId = 'icon-' + guidFor(this);

  /**
   * Indicates which icon should be used. An error (in the form of an assertion)
   * will occur if a value has not been provided.
   *
   * @param name {string}
   */
  get name() {
    return this.args.name;
  }

  constructor() {
    super(...arguments);
    if (!this.args.name) {
      assert('Please provide a value to <FlightIcon> for @name');
    }
  }

  /**
   * Get a class to apply to the icon based on the display argument.
   * @method FlightIcon#displayClass
   * @return {string} The css class to apply to the SVG.
   */
  get displayClass() {
    const isInlineBlock = this.args.isInlineBlock ?? true;
    if (isInlineBlock && !this.args.stretched) {
      return 'flight-icon-display-inline';
    } else {
      return null;
    }
  }

  /**
   * Gets the icon's size (16 or 24)
   *
   * @param size
   * @returns the value of `size` if set
   * @default `16`
   */
  get size() {
    return this.args.size ?? '16';
  }

  /**
   * Get the SVG width/height depending if the icon is stretched or not
   * @method FlightIcon#svgSize
   * @return {object} The width/height to apply to the SVG.
   */
  get svgSize() {
    return {
      width: this.args.stretched ? '100%' : this.size,
      height: this.args.stretched ? '100%' : this.size,
    };
  }

  /**
   * Generates a unique ID for the title
   *
   * @param titleId
   */
  titleId = 'title-' + guidFor(this);

  /**
   * Gets the icon's title if one is set
   *
   * @param title
   * @returns the value of `title` if set
   * @default null
   */
  get title() {
    return this.args.title ?? null;
  }

  /**
   *
   * Sets a role if a title exists
   *
   * @param role {string}
   * @returns 'img' or null
   * @default null
   */
  get role() {
    if (this.args.title) {
      return 'img';
    } else {
      return null;
    }
  }
  /**
   *
   * Sets aria-labelledby if a title exists
   *
   * @param ariaLabelledby {string}
   * @returns value of titleId or null
   * @default null
   */
  get ariaLabelledby() {
    if (this.args.title) {
      return this.titleId;
    } else {
      return null;
    }
  }
}
