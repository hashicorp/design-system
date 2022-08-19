import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

export const DIRECTIONS = ['horizontal', 'vertical'];
export const SPACING_SIZES = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const regEx = /^((\d+)|(\d+\.\d+)|(\.\d+))(px|rem|em|%)$/;

export default class HdsGuttersIndexComponent extends Component {
  /**
   * Get the direction for the component
   * Accepted values: 'horizontal', 'vertical'
   * @param direction
   * @type {string}
   * @default ? // TODO: Determine if a default should be set & if so which value
   */
  get direction() {
    let { direction } = this.args;

    assert(
      '@direction for "Hds::Gutters" must have a valid value',
      DIRECTIONS.includes(direction)
    );

    return direction;
  }

  /**
   * Get the preset spacing size to apply to the item.
   * Accepted values: 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'
   * @param spacing
   * @method presetSpacing
   * @type {string} The class name to apply to the item.
   * @default handled by CSS
   */
  get presetSpacing() {
    let { spacing } = this.args;

    assert(
      '@spacing for "Hds::Gutters" must have a valid value',
      SPACING_SIZES.includes(spacing) ||
        spacing === undefined ||
        spacing.match(regEx)
    );

    if (SPACING_SIZES.includes(spacing)) {
      return spacing;
    }

    return undefined;
  }

  /**
   * Get the inline custom spacing style to apply to the item.
   * Accepted values: '1px', '2.4rem', '3em', '2%', etc. (only positive numbers)
   * @param spacing
   * @method customSpacing
   * @type {string} The "style" attribute to apply to the item.
   * @default handled by CSS
   */
  get customSpacing() {
    let { spacing } = this.args;

    assert(
      '@spacing for "Hds::Gutters" must have a valid value',
      SPACING_SIZES.includes(spacing) ||
        spacing === undefined ||
        spacing.match(regEx)
    );

    if (spacing !== undefined) {
      if (spacing.match(regEx)) {
        return htmlSafe(`--hds-spacing: ${spacing}`);
      }
    }

    return undefined;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-gutters'];

    // add a class based on the @spacing argument
    if (this.presetSpacing) {
      classes.push(`hds-child-spacing-${this.presetSpacing}`);
    }

    // add a class based on the @direction argument
    classes.push(`hds-gutters-${this.direction}`);

    return classes.join(' ');
  }
}
