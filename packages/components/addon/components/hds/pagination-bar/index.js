import Component from '@glimmer/component';
// import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export const TYPES = ['numbered', 'compact'];

export default class HdsPaginationBarIndexComponent extends Component {
  totalPages = Math.max(
    Math.ceil(this.args.totalItems / this.args.itemsPerPage),
    1
  );
  @tracked currentPage = 1; // TODO: refactor so can be passed in by user (create an arg)

  @tracked itemsRangeStart =
    // Calculate the starting range of items displayed on current page
    // if currentPage = 1st page and # of items per page is 10:
    //  ( (1 - 1 = 0) * 10 = 0 ) + 1 = 1
    // if current page = 2nd page:
    // ( (2 - 1 = 1) * 10 = 10 ) + 1 = 11
    (this.currentPage - 1) * this.args.itemsPerPage + 1;

  @tracked itemsRangeEnd =
    // Calculate ending range of items displayed on current page
    // 2 cases: 1) full page of items or 2) potentially less than full page of items (last page)
    this.currentPage < this.totalPages
      ? // 1) full page of items (pages 1 to page before last):
        this.itemsRangeStart + this.args.itemsPerPage - 1
      : // 2) Potentially less than full page of items (last page):
        this.args.totalItems - this.itemsRangeEnd + this.itemsRangeStart - 1;

  /**
   * Shows totalItems if true
   *
   * @param hasTotalItems
   * @type {boolean}
   * @default true
   */
  get hasTotalItems() {
    return this.args.hasTotalItems ?? true;
  }

  /**
   * Shows the TotalCount if true
   *
   * @param showTotalCount
   * @type {boolean}
   * @default true
   */
  get showTotalCount() {
    return this.args.showTotalCount ?? true;
  }

  /**
   * Shows the PageSize if true
   *
   * @param showPageSize
   * @type {boolean}
   * @default true
   */
  get showPageSize() {
    return this.args.showPageSize ?? true;
  }

  @action
  onPageChange(newPage) {
    this.currentPage = newPage;
    this.itemsRangeStart = (this.currentPage - 1) * this.args.itemsPerPage + 1;
    this.itemsRangeEnd =
      this.currentPage < this.totalPages
        ? this.itemsRangeStart + this.args.itemsPerPage - 1
        : this.args.totalItems - this.itemsRangeEnd + this.itemsRangeStart - 1;
  }

  // /**
  //  * Get the class names to apply to the component.
  //  * @method classNames
  //  * @return {string} The "class" attribute to apply to the component.
  //  */
  // get classNames() {
  //   let classes = ['hds-pagination-bar'];

  //   // add a class based on the @xxx argument
  //   // classes.push(`hds-pagination--[variant]-${this.xxx}`);

  //   return classes.join(' ');
  // }
}
