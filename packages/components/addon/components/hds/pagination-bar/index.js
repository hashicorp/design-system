import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export const TYPES = ['numbered', 'compact'];

export default class HdsPaginationBarIndexComponent extends Component {
  _currentItemsPerPage = this.args.itemsPerPage;

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

  @action
  onPageChange(newPage) {
    this.currentPage = newPage;
  }

  @action
  onPageSizeChange(newPageSize) {
    this._currentItemsPerPage = newPageSize;
    this.currentPage = 1;
    this.totalPages = Math.max(
      Math.ceil(this.args.totalItems / this.itemsPerPage),
      1
    );
  }
}
