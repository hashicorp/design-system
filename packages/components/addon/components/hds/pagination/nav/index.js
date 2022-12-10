import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

export const DEFAULT_TYPE = 'compact';
export const TYPES = ['compact', 'numbered'];

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

    assert('@totalPages must not be undefined.', totalPages !== undefined);

    return totalPages;
  }

  get pages() {
    let pages = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  get isDisabledPrev() {
    return this.currentPage === 1;
  }

  get isDisabledNext() {
    return this.currentPage === this.totalPages;
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
