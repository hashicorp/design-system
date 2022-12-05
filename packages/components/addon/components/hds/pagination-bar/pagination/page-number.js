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

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [];

    if (this.isSelected) {
      classes.push(`hds-pagination__page-selected`);
    }

    return classes.join(' ');
  }
}
