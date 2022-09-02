import Component from '@glimmer/component';
import { assert, warn } from '@ember/debug';

// only some font-weight and style + font-weight combinations are allowed (per design specs)
export const AVAILABLE_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];
export const AVAILABLE_SIZE_WEIGHT_COMBINATIONS = {
  // notice: the first weight in the array is considered the "default"
  'display-500': ['bold'],
  'display-400': ['bold', 'semibold', 'medium'],
  'display-300': ['bold', 'semibold', 'medium'],
  'display-200': ['semibold'],
  'display-100': ['medium'],
  'body-300': ['regular', 'medium', 'semibold'],
  'body-200': ['regular', 'medium', 'semibold'],
  'body-100': ['regular', 'medium', 'semibold'],
  'code-300': ['regular'],
  'code-200': ['regular'],
  'code-100': ['regular'],
};
export const AVAILABLE_COLORS = [
  'primary',
  'strong',
  'faint',
  'disabled',
  'high-contrast',
  'action',
  'action-hover',
  'action-active',
  'highlight',
  'highlight-on-surface',
  'highlight-high-contrast',
  'success',
  'success-on-surface',
  'success-high-contrast',
  'warning',
  'warning-on-surface',
  'warning-high-contrast',
  'critical',
  'critical-on-surface',
  'critical-high-contrast',
];

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
      )}; received: ${size}`,
      ACCEPTED_SIZES.includes(size)
    );

    return size;
  }

  /**
   * Sets the weight of the text
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
    } else {
      assert(
        `@weight for "Hds::Text" must be one of the following: ${AVAILABLE_WEIGHTS.join(
          ', '
        )}; received: ${weight}`,
        AVAILABLE_WEIGHTS.includes(weight)
      );
      warn(
        `@weight for "Hds::Text" with @size="${
          this.size
        }" must be one of the following: ${AVAILABLE_SIZE_WEIGHT_COMBINATIONS[
          this.size
        ].join(
          ', '
        )}; received: "${weight}". (If you need a specific size/weight combination not yet supported please speak with the Design System team.)`,
        AVAILABLE_SIZE_WEIGHT_COMBINATIONS[this.size].includes(weight),
        {
          id: 'ember-debug.hds.text-wrong-size-weight-combination',
        }
      );
    }

    return weight;
  }

  /**
   * Sets the alignment of the text
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
        )}; received: ${align}`,
        ALIGNS.includes(align)
      );
    }

    return align;
  }

  /**
   * Sets the color of the text as pre-defined value
   * Accepted values: see AVAILABLE_COLORS
   *
   * @param color
   * @type {string}
   */
  get predefinedColor() {
    let { color } = this.args;

    if (AVAILABLE_COLORS.includes(color)) {
      return color;
    } else {
      return undefined;
    }
  }

  /**
   * Sets the color of the text as custom value (via inline style)
   *
   * @param color
   * @type {string}
   */
  get customColor() {
    let { color } = this.args;

    if (!AVAILABLE_COLORS.includes(color)) {
      return color;
    } else {
      return undefined;
    }
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

    // Add a class based on the @color argument (if pre-defined)
    if (this.predefinedColor) {
      classes.push(`hds-text--color-${this.predefinedColor}`);
    }

    return classes.join(' ');
  }
}
