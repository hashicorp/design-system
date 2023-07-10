import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const AVAILABLE_ALIGNS = ['left', 'center', 'right'];

export default class HdsTextIndexComponent extends Component {
  /**
   * Get a tag to render based on the `@tag` argument passed or the value of `this.size` (via mapping)
   *
   * @method #componentTag
   * @return {string} The html tag to use in the dynamic render of the component
   */
  get componentTag() {
    let { tag = 'span' } = this.args;

    return tag;
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
    let { group, size } = this.args;

    // notice: for performance reasons we don't do any other extra check on these values
    // we assume they've already been validated by the "parent" components
    return `${group}-${size}`;
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
   * Get the class names to apply to the component.
   * @method #classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-text'];

    // add a (helper) class based on the "group + size" variant
    classes.push(`hds-typography-${this.variant}`);

    // add a (helper) class based on the @weight argument
    if (this.args.weight) {
      classes.push(`hds-font-weight-${this.args.weight}`);
    }

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-text--align-${this.align}`);
    }
    }

    return classes.join(' ');
  }
}
