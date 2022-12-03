import Component from '@glimmer/component';

export default class HdsPaginationBarTotalCountComponent extends Component {
  /**
   * Shows totalItems in UI if true
   *
   * @param hasTotalItems
   * @type {boolean}
   * @default true
   */
  get hasTotalItems() {
    return this.args.hasTotalItems ?? true;
  }

  get itemsRangeStart() {
    // Calculate the starting range of items displayed on current page
    // if currentPage = 1st page and # of items per page is 10:
    //  ( (1 - 1 = 0) * 10 = 0 ) + 1 = 1
    // if current page = 2nd page:
    // ( (2 - 1 = 1) * 10 = 10 ) + 1 = 11
    return (this.args.currentPage - 1) * this.args.itemsPerPage + 1;
  }

  get itemsRangeEnd() {
    // Calculate ending range of items displayed on current page
    // 2 cases: 1) full page of items or 2) last page of items
    if (this.args.currentPage * this.args.itemsPerPage < this.args.totalItems) {
      // 1) full page of items (pages 1 to page before last):
      return this.itemsRangeStart + this.args.itemsPerPage - 1;
    } else {
      // 2) last page of items:
      return this.args.totalItems;
    }
  }
}
