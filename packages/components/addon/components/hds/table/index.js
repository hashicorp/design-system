import Component from '@glimmer/component';

/**
 * @class HdsTable
 */
export default class HdsTableIndexComponent extends Component {
  /**
   * Sets the data source that gets yielded by the `:body` named block.
   * @argument model
   * @type {array}
   */
  /**
   * Specifies which field the `@model` is sorted by. This **does not perform a sort**.
   * It is only used to set states on the contextual `SortBy` components.
   * @argument sortProperty
   * @type {string}
   */
  /**
   * Specifies which direction the `@model` is sorted. Descending when `true`, ascending when
   * `false`. This **does not perform a sort**. It is only used to set states on the
   * contextual `SortBy` components.
   * @argument sortDescending
   * @type {boolean}
   */

  // Convenience getter since all query params are strings.
  get sortDescending() {
    const arg = this.args.sortDescending;
    if (typeof arg === 'boolean') return arg;
    return arg === 'true';
  }
}
