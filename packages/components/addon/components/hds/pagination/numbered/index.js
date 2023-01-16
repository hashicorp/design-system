import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';

export default class HdsPaginationNumberedIndexComponent extends Component {
  @service router;

  @tracked currentItemsPerPage = this.args.itemsPerPage;
  @tracked totalPages = this.calculateTotalPages();
  @tracked _currentPage = this.args.currentPage ?? 1;
  @tracked _currentPageSize = this.args.itemsPerPage;

  showInfo = this.args.showInfo ?? true; // if the "info" block is visible
  showLabels = this.args.showLabels ?? false; // if the labels for the "prev/next" controls are visible
  showSizeSelector = this.args.showSizeSelector ?? true; // if the "size selector" block is visible
  showPageNumbers = this.args.showPageNumbers ?? true; // if the "page numbers" block is visible
  isTruncated = this.args.isTruncated ?? true; // if the list of "page numbers" is truncated

  get routeQueryParams() {
    return this.router.currentRoute?.queryParams || {};
  }

  get currentPage() {
    console.log('get currentPage() called');
    // return this.args.currentPage ?? this._currentPage;
    return this._currentPage;
  }

  set currentPage(value) {
    console.log(
      `set currentPage() called [1] with value="${value}" and this._currentPage=${this._currentPage}`
    );
    // if (this.args.currentPage === null || this.args.currentPage === undefined) {
    this._currentPage = value;
    console.log(
      `set currentPage() called [2] with value="${value}" and this._currentPage=${this._currentPage}`
    );
    // }
  }

  get currentPageSize() {
    console.log('get currentPageSize() called');
    // return this.args.currentPage ?? this._currentPage;
    return this._currentPageSize;
  }

  set currentPageSize(value) {
    console.log(
      `set currentPageSize() called [1] with value="${value}" and this._currentPageSize=${this._currentPageSize}`
    );
    // if (this.args.currentPage === null || this.args.currentPage === undefined) {
    this._currentPageSize = value;
    console.log(
      `set currentPageSize() called [2] with value="${value}" and this._currentPageSize=${this._currentPageSize}`
    );
    // }
  }

  calculateTotalPages() {
    return Math.max(Math.ceil(this.args.totalItems / this.itemsPerPage), 1);
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
    if (this.currentPage * this.itemsPerPage < this.args.totalItems) {
      // 1) full page of items (pages 1 to page before last):
      return this.itemsRangeStart + this.itemsPerPage - 1;
    } else {
      // 2) last page of items:
      return this.args.totalItems;
    }
  }

  get pages() {
    let pages = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    if (this.isTruncated) {
      return this.elliptize({ pages, current: this.currentPage });
    } else {
      return pages;
    }
  }

  elliptize({ pages, current }) {
    const limit = 7; // limit # of page numbers shown at a time (should always be an odd number!)
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
  }

  queryParamsByPage(page) {
    let queryParams = Object.assign({}, this.routeQueryParams);

    if (this.args.queryParamPage) {
      queryParams[this.args.queryParamPage] = page;
    }
    if (this.args.queryParamPageSize) {
      queryParams[this.args.queryParamPageSize] = this.currentPageSize;
    }

    return queryParams;
  }

  get queryParams() {
    let queryParams = {};
    queryParams.prev = this.queryParamsByPage(this.currentPage - 1);
    queryParams.next = this.queryParamsByPage(this.currentPage + 1);
    // important: we neeed to use an object and not an array
    // otherwise the {{get object page}} will be shifted by one
    // (the pages are 1-based while the array would be zero-based)
    queryParams.pages = {};
    this.pages.forEach(
      (page) => (queryParams.pages[page] = this.queryParamsByPage(page))
    );
    return queryParams;
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
    this.currentPage = 1; // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentItemsPerPage = newPageSize;
    this.totalPages = this.calculateTotalPages();

    let { onPageSizeChange, queryParamPage, queryParamPageSize } = this.args;

    if (typeof onPageSizeChange === 'function') {
      onPageSizeChange(newPageSize);
    }

    // TODO!!!
    if (
      queryParamPageSize &&
      this.routeQueryParams[queryParamPage] &&
      this.routeQueryParams[queryParamPageSize]
    ) {
      this.router.transitionTo({
        queryParams: {
          // we need to update also the `currentPage` because we've reset it to "1"
          queryParamPage: this.currentPage,
          queryParamPageSize: this.currentItemsPerPage,
        },
      });
    }
  }
}
