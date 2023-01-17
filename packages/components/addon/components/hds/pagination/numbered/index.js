import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';

export default class HdsPaginationNumberedIndexComponent extends Component {
  @service router;

  @tracked _currentPage = this.args.currentPage ?? 1;
  @tracked _currentPageSize = this.args.itemsPerPage ?? this.args.pageSizes[0];

  showInfo = this.args.showInfo ?? true; // if the "info" block is visible
  showLabels = this.args.showLabels ?? false; // if the labels for the "prev/next" controls are visible
  showSizeSelector = this.args.showSizeSelector ?? true; // if the "size selector" block is visible
  showPageNumbers = this.args.showPageNumbers ?? true; // if the "page numbers" block is visible
  isTruncated = this.args.isTruncated ?? true; // if the list of "page numbers" is truncated

  constructor() {
    super(...arguments);

    let { queryParamPage, queryParamPageSize } = this.args;

    if (queryParamPage === undefined && queryParamPageSize === undefined) {
      this.hasRouting = false;
    } else {
      assert(
        '@queryParamPage and @queryParamPageSize for "Hds::Numbered" must be both or undefined or defined as strings (you can\'t have only one defined)',
        typeof queryParamPage === 'string' &&
          typeof queryParamPageSize === 'string'
      );
      this.hasRouting = true;
    }

    this.router.on('routeWillChange', this.onRouteWillChange);
    this.router.on('routeDidChange', this.onRouteDidChange);
  }

  @action
  onRouteWillChange(transition) {
    console.log(
      `onRoute[WILL]Change - will transition ` +
        `from queryParam[demoCurrentPage]=${transition.from?.queryParams?.demoCurrentPage} and queryParam[demoCurrentPageSize]=${transition.from?.queryParams?.demoCurrentPageSize}` +
        ` → → → → → → ` +
        `to queryParam[demoCurrentPage]=${transition.to?.queryParams?.demoCurrentPage} && queryParam[demoCurrentPageSize]=${transition.to?.queryParams?.demoCurrentPageSize}`,
      transition
    );
  }

  @action
  onRouteDidChange(transition) {
    console.log(
      `onRoute[DID]Change - transitioned` +
        `from queryParam[demoCurrentPage]=${transition.from?.queryParams?.demoCurrentPage} and queryParam[demoCurrentPageSize]=${transition.from?.queryParams?.demoCurrentPageSize}` +
        ` → → → → → → ` +
        `to queryParam[demoCurrentPage]=${transition.to?.queryParams?.demoCurrentPage} && queryParam[demoCurrentPageSize]=${transition.to?.queryParams?.demoCurrentPageSize}`,
      transition
    );
  }

  get currentPage() {
    // Jamie's code
    // return this.args.currentPage ?? this._currentPage;
    // New code
    if (this.hasRouting) {
      return this.args.currentPage;
    } else {
      return this._currentPage;
    }
  }

  set currentPage(value) {
    // Jamie's code
    // if (this.args.currentPage === null || this.args.currentPage === undefined) {
    // New code
    if (this.hasRouting) {
      // noop
    } else {
      this._currentPage = value;
    }
  }

  get currentPageSize() {
    if (this.hasRouting) {
      return this.args.itemsPerPage;
    } else {
      return this._currentPageSize;
    }
  }

  set currentPageSize(value) {
    if (this.hasRouting) {
      // noop
      this._currentPageSize = value;
    } else {
      this._currentPageSize = value;
    }
  }

  get totalPages() {
    return Math.max(Math.ceil(this.args.totalItems / this.currentPageSize), 1);
  }

  get itemsRangeStart() {
    // Calculate the starting range of items displayed on current page
    // if currentPage = 1st page and # of items per page is 10:
    //  ( (1 - 1 = 0) * 10 = 0 ) + 1 = 1
    // if current page = 2nd page:
    // ( (2 - 1 = 1) * 10 = 10 ) + 1 = 11
    return (this.currentPage - 1) * this.currentPageSize + 1;
  }

  get itemsRangeEnd() {
    // Calculate ending range of items displayed on current page
    // 2 cases: 1) full page of items or 2) last page of items
    if (this.currentPage * this.currentPageSize < this.args.totalItems) {
      // 1) full page of items (pages 1 to page before last):
      return this.itemsRangeStart + this.currentPageSize - 1;
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

  get routeQueryParams() {
    return this.router.currentRoute?.queryParams || {};
  }

  buildQueryParamsObject(page) {
    if (this.hasRouting) {
      let queryParams = Object.assign({}, this.routeQueryParams);
      let { queryParamPage, queryParamPageSize } = this.args;
      queryParams[queryParamPage] = page;
      queryParams[queryParamPageSize] = this.currentPageSize;
      return queryParams;
    } else {
      return {};
    }
  }

  get templateQueryParams() {
    let queryParams = {};
    queryParams.prev = this.buildQueryParamsObject(this.currentPage - 1);
    queryParams.next = this.buildQueryParamsObject(this.currentPage + 1);
    // IMPORTANT: here we neeed to use an object and not an array
    // otherwise the {{get object page}} will be shifted by one
    // (the pages are 1-based while the array would be zero-based)
    queryParams.pages = {};
    this.pages.forEach(
      (page) => (queryParams.pages[page] = this.buildQueryParamsObject(page))
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
        onPageChange(this.currentPage, this.currentPageSize);
      }
    }
  }

  @action
  onPageSizeChange(newPageSize) {
    let { queryParamPage, queryParamPageSize, onPageSizeChange } = this.args;

    // we need to manually update the query parameters in the route (it's not a link!)
    if (this.hasRouting) {
      let queryParams = Object.assign({}, this.routeQueryParams);
      // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
      queryParams[queryParamPage] = 1;
      queryParams[queryParamPageSize] = newPageSize;
      console.log(
        `About to transition with queryParamPage=${queryParams[queryParamPage]} (where this.currentPage=${this.currentPage}) and queryParamPageSize=${queryParams[queryParamPageSize]} (where this.currentPageSize=${this.currentPageSize})`,
        queryParams
      );
      this.router.transitionTo({ queryParams });
    } else {
      this.currentPage = 1; // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
      this.currentPageSize = newPageSize;
    }

    // invoke the callback function
    if (typeof onPageSizeChange === 'function') {
      onPageSizeChange(newPageSize);
    }
  }
}
