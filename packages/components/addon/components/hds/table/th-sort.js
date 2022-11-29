import Component from '@glimmer/component';

const NOOP = () => {};

export default class HdsTableThSortComponent extends Component {
  /**
   * @param ariaSort
   * @type {string}
   * @private
   * @description Sets the aria-sort attribute based on the sort order defined
   */
  get ariaSort() {
    if (this.args.isSorted) {
      return this.args.sortOrder === 'asc' ? 'ascending' : 'descending';
    } else {
      return undefined;
    }
  }

  /**
   * @param icon
   * @type {string}
   * @private
   * @default swap-vertical
   * @description Determines which icon to use based on the sort order defined
   */
  get icon() {
    if (this.args.isSorted && this.args.sortOrder) {
      return this.args.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down';
    } else {
      return 'swap-vertical';
    }
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    let { onClick } = this.args;
    return onClick || NOOP;
  }
}
