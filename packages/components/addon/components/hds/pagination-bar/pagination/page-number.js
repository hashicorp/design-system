import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HdsPaginationBarPaginationIndexComponent extends Component {
  get isSelected() {
    return this.args.page === this.args.currentPage;
  }

  @action
  onClick() {
    let { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.page);
    }
  }
}
