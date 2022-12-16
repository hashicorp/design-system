import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

export const DEFAULT_TYPE = 'compact';
export const TYPES = ['compact', 'numbered', 'truncated'];

export default class HdsPaginationNavIndexComponent extends Component {
  /**
   * Gets the type of pagination
   *
   * @param type
   * @type {string}
   * @default 'compact'
   */
  get type() {
    let { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Pagination::Nav" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  /**
   * Gets the current page
   *
   * @param currentPage
   * @type {number}
   */
  get currentPage() {
    let { currentPage = 1 } = this.args;

    assert(
      `@currentPage must be defined for "Hds::Pagination::Nav"`,
      currentPage !== undefined
    );

    return currentPage;
  }

  /**
   * Gets the totalPages
   *
   * @param totalPages
   * @type {number}
   */
  get totalPages() {
    let { totalPages } = this.args;

    assert('@totalPages must be defined.', totalPages !== undefined);

    return totalPages;
  }

  get pages() {
    let pages = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  get truncatedPages() {
    console.log(
      this.elliptize({ pages: this.pages, current: this.currentPage })
    );
    console.log(this.currentPage);
    return this.elliptize({ pages: this.pages, current: this.currentPage });
  }

  get isDisabledPrev() {
    return this.currentPage === 1;
  }

  get isDisabledNext() {
    return this.currentPage === this.totalPages;
  }

  elliptize({ pages, current }) {
    const array = Array.from(pages);
    const limit = 7; // limt # of page numbers shown at a time
    const length = array.length;
    const ellipsis = '…';
    let result = [];
    let start;
    let end;

    if (current <= length / 2) {
      start = Math.ceil(limit / 2);
      end = limit - start;
    } else {
      end = Math.ceil(limit / 2);
      start = limit - end;
    }

    const sliceStart = array.slice(0, start);
    const sliceEnd = array.slice(-end);
    const sliceCurr = [current - 1, current, current + 1];

    if (sliceStart.includes(current) && sliceStart.includes(current + 1)) {
      sliceEnd.splice(0, 1, ellipsis);
      result = [].concat(sliceStart, sliceEnd);
    } else if (sliceEnd.includes(current - 1) && sliceEnd.includes(current)) {
      sliceStart.splice(-1, 1, ellipsis);
      result = [].concat(sliceStart, sliceEnd);
    } else {
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

  @action
  onPageChange(page) {
    let gotoPage = this.currentPage;
    if (page === 'prev' && this.currentPage > 1) {
      gotoPage = this.currentPage - 1;
    } else if (page === 'next' && this.currentPage < this.totalPages) {
      gotoPage = this.currentPage + 1;
    } else {
      gotoPage = page;
    }

    // we want to invoke the `onPageChange` callback only on actual page change
    if (gotoPage !== this.currentPage) {
      let { onPageChange } = this.args;

      if (typeof onPageChange === 'function') {
        onPageChange(gotoPage);
      }
    }
  }
}
