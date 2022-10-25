import Component from '@glimmer/component';

export default class HdsTableThSortComponent extends Component {
  get isActiveSortColumn() {
    return this.args.sortKey === this.args.sortBy;
  }

  get ariaSort() {
    if (this.isActiveSortColumn) {
      return this.args.sortOrder === 'asc' ? 'ascending' : 'descending';
    } else {
      return undefined;
    }
  }

  get icon() {
    if (this.isActiveSortColumn) {
      return this.args.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down';
    } else {
      return 'swap-vertical';
    }
  }
}
