import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HdsPaginationBarIndexComponent extends Component {
  totalPages = this.args.totalPages;
  currentPage = this.args.currentPage ? this.args.currentPage : 1;

  get isNumbered() {
    let { type } = this.args;

    return type === 'numbered';
  }

  get isCompact() {
    let { type } = this.args;

    return type === 'compact';
  }

  @action
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      let { pageChanged } = this.args;
      if (typeof pageChanged === 'function') {
        pageChanged(this.currentPage);
      }
    }
  }

  @action
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      let { pageChanged } = this.args;
      if (typeof pageChanged === 'function') {
        pageChanged(this.currentPage);
      }
    }
  }
}
