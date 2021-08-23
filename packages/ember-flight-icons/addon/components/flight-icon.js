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
   * @default `24`
   */
  get size() {
    return this.args.size ?? '24';
  }
}
