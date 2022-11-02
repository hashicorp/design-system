import Component from '@glimmer/component';

export default class HdsTableThSortComponent extends Component {
  /**
   * @param isActiveSortColumn
   * @type {boolean}
   * @description Determines if the column is the active sort column
   */
  get isActiveSortColumn() {
    return this.args.sortKey === this.args.sortBy;
  }

  /**
   * @param ariaSort
   * @type {string}
   * @description Sets the aria-sort attribute based on the sort order defined
   */
  get ariaSort() {
    if (this.isActiveSortColumn) {
      return this.args.sortOrder === 'asc' ? 'ascending' : 'descending';
    } else {
      return undefined;
    }
  }

  /**
   * @param icon
   * @type {string}
   * @default swap-vertical
   * @description Determines which icon to use based on the sort order defined
   */
  get icon() {
    if (this.isActiveSortColumn) {
      return this.args.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down';
    } else {
      return 'swap-vertical';
    }
  }
}
