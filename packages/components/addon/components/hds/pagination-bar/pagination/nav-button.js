// TODO: Test button in isolation (the API, the UI, the interaction)

import Component from '@glimmer/component';
import { action } from '@ember/object';

export const DIRECTIONS = ['next', 'previous'];

export default class HdsPaginationBarPaginationIndexComponent extends Component {
  @action
  onClick() {
    let { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.direction);
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [
      'hds-pagination__page-link',
      'hds-typography-body-100',
      'hds-font-weight-medium',
    ];

    if (this.args.type === 'compact') {
      classes.push(`hds-pagination__page-link--labeled`);
    }

    return classes.join(' ');
  }
}
