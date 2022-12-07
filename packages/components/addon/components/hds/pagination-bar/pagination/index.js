import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';

export const DEFAULT_TYPE = 'compact';
export const TYPES = ['compact', 'numbered'];

export default class HdsPaginationBarPaginationIndexComponent extends Component {
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
      `@type for "Hds::PaginationBar" must be one of the following: ${TYPES.join(
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
   * @type {integer}
   */
  get currentPage() {
    let { currentPage = 1 } = this.args;

    assert(
      `@currentPage must be defined for "Hds::PaginationBar::Pagination"`,
      currentPage !== undefined
    );

    return currentPage;
  }

  get pages() {
    let pages = [];

    for (let i = 1; i <= this.args.totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  get isDisabledPrev() {
    return this.args.currentPage === 1;
  }

  get isDisabledNext() {
    return this.args.currentPage === this.args.totalPages;
  }

  @action
  changePage(direction) {
    if (direction === 'prev') {
      if (this.args.currentPage > 1) {
        let { onPageChange } = this.args;
        if (typeof onPageChange === 'function') {
          onPageChange(this.args.currentPage - 1);
        }
      }
    } else if (this.args.currentPage < this.args.totalPages) {
      let { onPageChange } = this.args;
      if (typeof onPageChange === 'function') {
        onPageChange(this.args.currentPage + 1);
      }
    }
  }

  @action
  onSelectPage(page) {
    if (page !== this.args.currentPage) {
      let { onPageChange } = this.args;
      if (typeof onPageChange === 'function') {
        onPageChange(page);
      }
    }
  }
}
