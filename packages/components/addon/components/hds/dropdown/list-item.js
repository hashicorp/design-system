import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export const DEFAULT_COLOR = 'action';
export const DEFAULT_ITEM = 'interactive';
export const COLORS = ['action', 'critical'];
export const ITEMS = [
  'copy-item',
  'description',
  'generic',
  'interactive',
  'separator',
  'title',
];

export default class HdsDropdownListItemComponent extends Component {
  @tracked isSuccess = this.args.isSuccess ?? false;

  /**
   * @param item
   * @type {string}
   * @default interactive
   * @description Determines the type of item to show
   */
  get item() {
    let { item = DEFAULT_ITEM } = this.args;

    assert(
      `@item for "Hds::Dropdown::ListItem" must be one of the following: ${ITEMS.join(
        ', '
      )}; received: ${item}`,
      ITEMS.includes(item)
    );

    return item;
  }

  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown unless it is the generic or separator item type.
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of the item (when item is set to interactive)
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Dropdown::ListItem" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param icon
   * @type {string}
   * @default null
   * @description The name of the icon to be used.
   */
  get icon() {
    assert(
      `when the "Hds::ListItem" @color is "critical" an @icon is required`,
      !(this.color === 'critical' && !this.args.icon)
    );

    return this.args.icon ?? null;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-dropdown-list-item'];

    // add a class based on the @item argument
    classes.push(`hds-dropdown-list-item--${this.item}`);
    if (this.item === 'description') {
      classes.push('hds-typography-body-100');
      classes.push('hds-font-weight-regular');
    }

    if (this.item === 'title') {
      classes.push('hds-typography-body-100');
      classes.push('hds-font-weight-semibold');
    }

    // add a class based on the @color argument
    if (this.item === 'interactive') {
      classes.push(`hds-dropdown-list-item--color-${this.color}`);
    }

    return classes.join(' ');
  }

  @action
  copyCode() {
    navigator.clipboard.writeText(this.args.text);
    // this if statement resolves to [object Promise] so maybe some improvements
    // could be made here
    if (navigator.clipboard.readText()) {
      this.isSuccess = true;
    }
  }
}
