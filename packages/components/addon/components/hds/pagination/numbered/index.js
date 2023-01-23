import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

export const DEFAULT_PAGE_SIZES = [10, 30, 50];

/**
 * Elliptize a list of pages
 *
 * @param pages - array with all the "pages" (integer numbers)
 * @param current - "current" page (array's index)
 * @param limit - number of "page numbers" to be shown at a time (should always be an odd number!)
 *
 * @return - array of integers ("pages") + `...` strings ("ellipsis")
 */
export const elliptize = ({ pages, current, limit = 7 }) => {
  const length = pages.length;
  const ellipsis = '…';
  let result = [];
  let start;
  let end;

  if (length <= limit) {
    return pages;
  }

  if (current <= length / 2) {
    start = Math.ceil(limit / 2);
    end = limit - start;
  } else {
    end = Math.ceil(limit / 2);
    start = limit - end;
  }

  const sliceStart = pages.slice(0, start);
  const sliceEnd = pages.slice(-end);

  if (sliceStart.includes(current) && sliceStart.includes(current + 1)) {
    // "current" (and its next sibling) is contained within the "sliceStart" block
    sliceEnd.splice(0, 1, ellipsis);
    result = [].concat(sliceStart, sliceEnd);
  } else if (sliceEnd.includes(current - 1) && sliceEnd.includes(current)) {
    // "current" (and its prev sibling) is contained within the "sliceEnd" block
    sliceStart.splice(-1, 1, ellipsis);
    result = [].concat(sliceStart, sliceEnd);
  } else {
    // this is a bit more tricky :)
    // we need to calculate how many items there are before/after the current item
    // since both the initial and ending blocks are always 2 items long (number + ellipsis)
    // and there is always the "current" item, we can just subtract 5 from the limit
    const delta = (limit - 5) / 2; // this is why the limit needs to be an odd number
    // we slice the array starting at the "current" index, minus the delta, minus one because it's an array (zero-based)
    const sliceCurr = pages.slice(current - delta - 1, current + delta);
    result = [].concat(
      sliceStart.shift(),
      ellipsis,
      sliceCurr,
      ellipsis,
      sliceEnd.pop()
    );
  }

  return result;
};

export default class HdsPaginationNumberedIndexComponent extends Component {
  @tracked currentItemsPerPage = this.args.itemsPerPage ?? this.pageSizes[0];
  @tracked totalPages = this.calculateTotalPages();
  @tracked currentPage = this.args.currentPage ?? 1;

  showInfo = this.args.showInfo ?? true; // if the "info" block is visible
  showLabels = this.args.showLabels ?? false; // if the labels for the "prev/next" controls are visible
  showSizeSelector = this.args.showSizeSelector ?? true; // if the "size selector" block is visible
  showPageNumbers = this.args.showPageNumbers ?? true; // if the "page numbers" block is visible
  isTruncated = this.args.isTruncated ?? true; // if the list of "page numbers" is truncated

  /**
   * Gets the current page
   *
   * @param currentPage
   * @type {number}
   */
  get currentPage() {
    let { currentPage = 1 } = this.args;

    return currentPage;
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

  /**
   * @param pageSizes
   * @type {array of numbers}
   * @description Set the page sizes users can select from.
   * @default [10, 30, 50]
   */
  get pageSizes() {
    let { pageSizes = DEFAULT_PAGE_SIZES } = this.args;

    assert(
      `pageSizes argument must be an array. Received: ${pageSizes}`,
      Array.isArray(pageSizes) === true
    );

    return pageSizes;
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

  get pages() {
    let pages = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    if (this.isTruncated) {
      return elliptize({ pages, current: this.currentPage });
    } else {
      return pages;
    }
  }

  get isDisabledPrev() {
    return this.currentPage === 1;
  }

  get isDisabledNext() {
    return this.currentPage === this.totalPages;
  }

  @action
  onPageChange(page) {
    let gotoPageNumber;
    if (page === 'prev' && this.currentPage > 1) {
      gotoPageNumber = this.currentPage - 1;
    } else if (page === 'next' && this.currentPage < this.totalPages) {
      gotoPageNumber = this.currentPage + 1;
    } else {
      gotoPageNumber = page;
    }

    // we want to invoke the `onPageChange` callback only on actual page change
    if (gotoPageNumber !== this.currentPage) {
      this.currentPage = gotoPageNumber;

      let { onPageChange } = this.args;

      if (typeof onPageChange === 'function') {
        onPageChange(this.currentPage, this.currentItemsPerPage);
      }
    }
  }

  @action
  onPageSizeChange(newPageSize) {
    this.currentItemsPerPage = newPageSize;
    this.currentPage = 1; // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.totalPages = this.calculateTotalPages();

    let { onPageSizeChange } = this.args;

    if (typeof onPageSizeChange === 'function') {
      onPageSizeChange(newPageSize);
    }
  }

  calculateTotalPages() {
    if (this.totalItems) {
      return Math.max(Math.ceil(this.totalItems / this.itemsPerPage), 1);
    } else {
      return undefined;
    }
  }
}
