import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export const TYPES = ['numbered', 'compact'];

export default class HdsPaginationBarIndexComponent extends Component {
  @tracked _currentItemsPerPage = this.args.itemsPerPage;

  @tracked totalPages = Math.max(
    Math.ceil(this.totalItems / this.itemsPerPage),
    1
  );

  @tracked currentPage = this.args.currentPage ?? 1;

  /**
   * @param totalItems
   * @type {number}
   * @description Pass the total number of items to be paginated. If no value is defined an error will be thrown.
   */
  get totalItems() {
    let { totalItems } = this.args;

    assert('@totalItems must be defined', totalItems !== undefined);

    return totalItems;
  }

  /**
   * @param itemsPerPage
   * @type {number}
   * @description Pass the maximum number of items to display on each page initially.
   */
  get itemsPerPage() {
    assert(
      '@itemsPerPage must be defined',
      this._currentItemsPerPage !== undefined
    );

    return this._currentItemsPerPage;
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
    this._currentItemsPerPage = newPageSize;
    this.currentPage = 1;
    this.totalPages = Math.max(
      Math.ceil(this.totalItems / this.itemsPerPage),
      1
    );
  }
}
