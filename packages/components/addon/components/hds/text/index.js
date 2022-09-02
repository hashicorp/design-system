import Component from '@glimmer/component';
import { assert } from '@ember/debug';

// only some font-weight and style + font-weight combinations are allowed (per design specs)
export const AVAILABLE_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];
export const AVAILABLE_SIZE_WEIGHT_COMBINATIONS = {
  'display-500': ['bold'],
  'display-400': ['medium', 'semibold', 'bold'],
  'display-300': ['medium', 'semibold', 'bold'],
  'display-200': ['semibold'],
  'display-100': ['medium'],
  'body-300': ['regular', 'medium', 'semibold'],
  'body-200': ['regular', 'medium', 'semibold'],
  'body-100': ['regular', 'medium', 'semibold'],
  'code-300': ['regular'],
  'code-200': ['regular'],
  'code-100': ['regular'],
};
export const AVAILABLE_TAGS = [];

export const MAPPING_SIZE_TO_TAG = {
  'display-500': 'h1',
  'display-400': 'h2',
  'display-300': 'h3',
  'display-200': 'h4',
  'display-100': 'h5',
  'body-300': 'p',
  'body-200': 'p',
  'body-100': 'p',
  'code-300': 'code',
  'code-200': 'code',
  'code-100': 'code',
};
export const ALIGNS = ['left', 'center', 'right'];

export default class HdsTextIndexComponent extends Component {
  /**
   * Get a tag to render based on:
   * - the `@tag` argument passed or
   * - the `@size` prop (via mapping)
   * @method #tag
   * @return {string} The html tag to use in the dynamic render of the component
   */
  get tag() {
    return this.args.tag || MAPPING_SIZE_TO_TAG[this.size];
  }

  /**
   * Sets the size (style) for the text
   *
   * @param size
   * @type {string}
   */
  get size() {
    let { size } = this.args;

    const ACCEPTED_SIZES = Object.keys(MAPPING_SIZE_TO_TAG);

    assert(
      `@size for "Hds::Text" must be one of the following: ${ACCEPTED_SIZES.join(
        ', '
      )}, received: ${size}`,
      ACCEPTED_SIZES.includes(size)
    );

    return size;
  }

  /**
   * Sets the alignment for the text
   * Accepted values: see ALIGNS
   *
   * @param align
   * @type {string}
   */
  get align() {
    let { align } = this.args;

    if (align) {
      assert(
        `@align for "Hds::Text" must be one of the following: ${ALIGNS.join(
          ', '
        )}, received: ${align}`,
        ALIGNS.includes(align)
      );
    }

    return align;
  }

  /**
   * Sets the weight for the text
   * Accepted values: see AVAILABLE_WEIGHTS
   *
   * @param weight
   * @type {string}
   */
  get weight() {
    let { weight } = this.args;

    // if @weight is not provided, we use a default depending on the @size argument
    if (weight === undefined) {
      // as default we choose the lowest weight available for that size
      weight = AVAILABLE_SIZE_WEIGHT_COMBINATIONS[this.size][0];
    }

    assert(
      `@weight for "Hds::Text" must be one of the following: ${AVAILABLE_WEIGHTS.join(
        ', '
      )}, received: ${weight}`,
      AVAILABLE_WEIGHTS.includes(weight)
    );

    return weight;
  }

  /**
   * Get the class names to apply to the component.
   * @method #classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-text'];

    // Add a helper class based on the @size argument
    classes.push(`hds-typography-${this.size}`);

    // Add a helper class based on the @weight argument
    if (this.weight) {
      classes.push(`hds-font-weight-${this.weight}`);
    }

    // Add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-text--align-${this.align}`);
    }

    return classes.join(' ');
  }
}
