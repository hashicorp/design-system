import Component from '@glimmer/component';

const NOOP = () => {};

export default class HdsTableThSortComponent extends Component {
  /**
   * @param ariaSort
   * @type {string}
   * @private
   * @description Sets the aria-sort attribute based on the sort order defined
   */
  get ariaSort() {
    if (this.args.isSorted) {
      return this.args.sortOrder === 'asc' ? 'ascending' : 'descending';
    } else {
      return undefined;
    }
  }

  /**
   * @param icon
   * @type {string}
   * @private
   * @default swap-vertical
   * @description Determines which icon to use based on the sort order defined
   */
  get icon() {
    if (this.args.isSorted && this.args.sortOrder) {
      return this.args.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down';
    } else {
      return 'swap-vertical';
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table__th-sort'];
    // add a class based on the @alignRight argument (if present)
    if (this.args.alignRight) {
      classes.push(`hds-table__th-sort--text-right`);
    }

    return classes.join(' ');
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    let { onClick } = this.args;
    return onClick || NOOP;
  }
}
