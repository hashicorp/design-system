import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export const DIRECTIONS = ['prev', 'next'];

export default class HdsPaginationBarPaginationIndexComponent extends Component {
  get content() {
    let { direction } = this.args;

    assert(
      `@direction for "PaginationBar::Pagination::NavButton" must be one of the following: ${DIRECTIONS.join(
        ', '
      )}; received: ${direction}`,
      DIRECTIONS.includes(direction)
    );

    let content;
    if (direction === 'prev') {
      content = {
        label: 'Previous',
        icon: 'chevron-left',
        ariaLabel: 'Previous page',
      };
    }
    if (direction === 'next') {
      content = {
        label: 'Next',
        icon: 'chevron-right',
        ariaLabel: 'Next page',
      };
    }

    return content;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [
      'hds-pagination__nav-button',
      'hds-pagination__page-link',
      'hds-typography-body-100',
      'hds-font-weight-medium',
    ];

    classes.push(
      `hds-pagination__nav-button--direction-${this.args.direction}`
    );

    if (this.args.type === 'compact') {
      classes.push(`hds-pagination__nav-button--labeled`);
    }

    return classes.join(' ');
  }

  @action
  onClick() {
    let { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.direction);
    }
  }
}
