import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

export default class HdsPaginationNavIndexComponent extends Component {
  /**
   * Gets the type of pagination
   *
   * @param type
   * @type {string}
   * @default 'compact'
   */
  get type() {
    return this.totalPages !== undefined ? 'numbered' : 'compact';
  }

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
   * Gets the totalPages
   *
   * @param totalPages
   * @type {number}
   */
  get totalPages() {
    let { totalPages } = this.args;

    return totalPages;
  }

  get pages() {
    let pages = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    if (this.args.isTruncated) {
      return this.elliptize({ pages, current: this.currentPage });
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
