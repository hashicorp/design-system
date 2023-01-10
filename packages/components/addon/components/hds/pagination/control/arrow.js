import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export const DIRECTIONS = ['prev', 'next'];

export default class HdsPaginationControlArrowComponent extends Component {
  get content() {
    let { direction } = this.args;

    assert(
      `@direction for "Pagination::Control::Arrow" must be one of the following: ${DIRECTIONS.join(
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
      'hds-pagination-nav__button-arrow',
      `hds-pagination-nav__button-arrow--direction-${this.args.direction}`,
      'hds-pagination-nav__control',
      'hds-typography-body-100',
      'hds-font-weight-medium',
    ];

    if (!this.args.hideLabel) {
      classes.push(`hds-pagination-nav__button-arrow--labeled`);
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
