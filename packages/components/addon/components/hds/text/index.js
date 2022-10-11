import Component from '@glimmer/component';
import { assert } from '@ember/debug';

// notice: only some font-weight and style + font-weight combinations are allowed (per design specs)
// see: https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?node-id=1262%3A9192
export const AVAILABLE_VARIANTS = [
  'display/500/bold',
  'display/400/medium',
  'display/400/semibold',
  'display/400/bold',
  'display/300/medium',
  'display/300/semibold',
  'display/300/bold',
  'display/200/semibold',
  'display/100/medium',
  'body/300/regular',
  'body/300/medium',
  'body/300/semibold',
  'body/200/regular',
  'body/200/medium',
  'body/200/semibold',
  'body/100/regular',
  'body/100/medium',
  'body/100/semibold',
  'code/300/regular',
  'code/200/regular',
  'code/100/regular',
];

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

export const MAPPING_STYLE_TO_TAG = {
  'display/500': 'h1',
  'display/400': 'h2',
  'display/300': 'h3',
  'display/200': 'h4',
  'display/100': 'h5',
  'body/300': 'p',
  'body/200': 'p',
  'body/100': 'p',
  'code/300': 'code',
  'code/200': 'code',
  'code/100': 'code',
};

export const MAPPING_TAG_TO_STYLE = {
  'h1': 'display/500/bold',
  'h2': 'display/400/semibold',
  'h3': 'display/300/semibold',
  'h4': 'display/200/semibold',
  'h5': 'display/100/medium',
  'p': 'body/200/regular',
  'code': 'code/200/regular',
  'pre': 'code/200/regular',
};

export const AVAILABLE_ALIGNS = ['left', 'center', 'right'];

export default class HdsTextIndexComponent extends Component {
  /**
   * Get a tag to render based on the `@tag` argument passed or the value of `this.size` (via mapping)
   *
   * @method #tag
   * @return {string} The html tag to use in the dynamic render of the component
   */
  get tag() {
    return (
      this.args.tag ||
      MAPPING_STYLE_TO_TAG[`${this.variant.group}/${this.variant.size}`]
    );
  }

  /**
   * Sets the "variant" (style) for the text
   * Accepted values: see AVAILABLE_VARIANTS
   *
   * @type {string}
   *
   * @param variant
   */
  get variant() {
    let { tag, variant } = this.args;

    if (variant) {
      variant = variant.toLowerCase();

      assert(
        `@variant for "Hds::Text" must be one of the following: ${AVAILABLE_VARIANTS.join(
          ', '
        )}; received: ${variant}`,
        AVAILABLE_VARIANTS.includes(variant)
      );
    } else if (tag) {
      tag = tag.toLowerCase();
      if (Object.keys(MAPPING_TAG_TO_STYLE).includes(tag)) {
        variant = MAPPING_TAG_TO_STYLE[tag];
      } else {
        assert(
          `You need to provide a @variant value for "Hds::Text" with @tag="${tag}"`
        );
      }
    } else {
      assert(
        `You need to provide at least one of the @tag or @variant arguments to "Hds::Text"`
      );
    }

    if (variant) {
      const [, group, size, weight] = variant.match(/^(\w+)\/(\w+)\/(\w+)$/);

      return {
        group,
        size,
        weight,
      };
    }
  }

  /**
   * Sets the alignment of the text
   * Accepted values: see AVAILABLE_ALIGNS
   *
   * @param align
   * @type {string}
   */
  get align() {
    let { align } = this.args;

    if (align) {
      assert(
        `@align for "Hds::Text" must be one of the following: ${AVAILABLE_ALIGNS.join(
          ', '
        )}; received: ${align}`,
        AVAILABLE_ALIGNS.includes(align)
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

    // Add a helper class based on the variant size
    classes.push(`hds-typography-${this.variant.group}-${this.variant.size}`);

    // Add a helper class based on the variant weight
    if (this.variant.weight) {
      classes.push(`hds-font-weight-${this.variant.weight}`);
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
