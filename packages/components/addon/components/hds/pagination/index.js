import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HdsPaginationIndexComponent extends Component {
  @tracked currentItemsPerPage = this.args.itemsPerPage;
  @tracked totalPages = this.calculateTotalPages();
  @tracked currentPage = this.args.currentPage ?? 1;

  // constructor() {
  //   super(...arguments);
  //   TODO add logic here that checks the different parameters dependencies
  // }

  get type() {
    return this.totalItems ? 'numbered' : 'compact';
  }

  /**
   * @param totalItems
   * @type {number}
   * @description Pass the total number of items to be paginated. If no value is defined an error will be thrown.
   */
  get totalItems() {
    let { totalItems } = this.args;

    return totalItems;
  }

  /**
   * @param itemsPerPage
   * @type {number}
   * @description Pass the maximum number of items to display on each page initially.
   */
  get itemsPerPage() {
    return this.currentItemsPerPage;
  }

  get itemsRangeStart() {
    // Calculate the starting range of items displayed on current page
    // if currentPage = 1st page and # of items per page is 10:
    //  ( (1 - 1 = 0) * 10 = 0 ) + 1 = 1
    // if current page = 2nd page:
    // ( (2 - 1 = 1) * 10 = 10 ) + 1 = 11
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get itemsRangeEnd() {
    // Calculate ending range of items displayed on current page
    // 2 cases: 1) full page of items or 2) last page of items
    if (this.currentPage * this.itemsPerPage < this.totalItems) {
      // 1) full page of items (pages 1 to page before last):
      return this.itemsRangeStart + this.itemsPerPage - 1;
    } else {
      // 2) last page of items:
      return this.totalItems;
    }
  }

  @action
  onPageChange(newPage) {
    this.currentPage = newPage;
  }

  @action
  onPageSizeChange(newPageSize) {
    this.currentItemsPerPage = newPageSize;
    this.currentPage = 1;
    this.totalPages = this.calculateTotalPages();
  }

  calculateTotalPages() {
    return Math.max(Math.ceil(this.totalItems / this.itemsPerPage), 1);
  }
}
