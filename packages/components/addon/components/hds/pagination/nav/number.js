import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HdsPaginationControlNumberComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-pagination-nav__page-item'];

    if (this.args.isSelected) {
      classes.push(`hds-pagination-nav__button-number--is-selected`);
    }

    return classes.join(' ');
  }

  @action
  onClick() {
    let { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.page);
    }
  }
}
