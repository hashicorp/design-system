import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export const DEFAULT_TYPE = 'compact';
export const TYPES = ['compact', 'numbered'];

export default class HdsPaginationBarPaginationIndexComponent extends Component {
  totalPages = this.args.totalPages ?? 0;
  @tracked currentPage = this.args.currentPage ? this.args.currentPage : 1;

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

  get isNumbered() {
    return this.type === 'numbered';
  }

  get isCompact() {
    return this.type === 'compact';
  }

  get isDisabledPrev() {
    return this.currentPage === 1 ? true : null;
  }

  get isDisabledNext() {
    return this.currentPage === this.totalPages ? true : null;
  }

  @action
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      let { onPageChange } = this.args;
      if (typeof onPageChange === 'function') {
        onPageChange(this.currentPage);
      }
    }
  }

  @action
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      let { onPageChange } = this.args;
      if (typeof onPageChange === 'function') {
        onPageChange(this.currentPage);
      }
    }
  }
}

