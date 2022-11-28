import Component from '@glimmer/component';
// import { assert } from '@ember/debug';
import { action } from '@ember/object';

export const DIRECTIONS = ['next', 'previous'];

export default class HdsPaginationBarPaginationIndexComponent extends Component {
  get direction() {
    return this.args.direction;
  }

  get isDisabled() {
    if (this.direction === 'previous') {
      return this.args.currentPage === 1;
    } else {
      return this.args.currentPage === this.args.totalPages;
    }
  }

  @action
  onClick() {
    let { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.direction);
    }
  }
}
