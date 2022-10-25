import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HdsTableIndexComponent extends Component {
  @tracked sortBy = this.args.sortBy;
  @tracked sortOrder = this.args.sortOrder || 'asc';
  @tracked sortedMessageText = '';

  /**
   * @param isSortableTable
   * @type {boolean}
   * @default false
   * @description Determines whether the table is sortable or not.
   */
  get isSortableTable() {
    const { columns } = this.args;
    return columns !== undefined;
  }

  get columns() {
    const { columns, sortingKeys } = this.args;

    if (this.isSortableTable) {
      columns.forEach((column) => {
        // if we have a `sortingKeys` parameter only some columns can be sorted, otherwise all the columns are sortable
        if (sortingKeys && sortingKeys.includes) {
          column.isSortableColumn = sortingKeys.includes(column.key);
        } else {
          column.isSortableColumn = true;
        }
      });
    }
    return columns;
  }

  get getSortCriteria() {
    return `${this.sortBy}:${this.sortOrder}`;
  }

  /**
   * @param isStriped
   * @type {boolean}
   * @default true
   * @description Determines whether the table rows should have alternating background colors; defaults to true.
   */
  get isStriped() {
    return this.args.isStriped ?? true;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-table'];

    // add a class based on the @isStriped argument
    if (this.isStriped) {
      classes.push('hds-table--striped');
    }

    return classes.join(' ');
  }

  @action
  setSortBy(column) {
    if (this.sortBy === column) {
      //invert the sort order
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.sortedMessageText = `Sorted by ${this.sortBy} ${this.sortOrder}ending`;
  }
}
