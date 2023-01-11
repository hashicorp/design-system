import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HdsPaginationControlNumberComponent extends Component {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [
      'hds-pagination-nav__control',
      'hds-pagination-nav__number',
      'hds-typography-body-100',
      'hds-font-weight-medium"',
    ];

    if (this.args.isSelected) {
      classes.push(`hds-pagination-nav__number--is-selected`);
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
