import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

export default class HdsTableIndexComponent extends Component {
  a11yMessageId = 'table-a11y-message-' + guidFor(this);

  @tracked sortBy = this.args.sortBy;
  @tracked sortOrder = this.args.sortOrder || 'asc';
  @tracked sortedMessageText = '';

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
