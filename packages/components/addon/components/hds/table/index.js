import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

const DENSITIES = ['short', 'medium', 'tall'];
const DEFAULT_DENSITY = 'medium';

export default class HdsTableIndexComponent extends Component {
  @tracked sortBy = this.args.sortBy;
  @tracked sortOrder = this.args.sortOrder || 'asc';
  @tracked sortedMessageText = '';

  /**
   * @param isSortableTable
   * @type {boolean}
   * @default false
   * @description Automatically determines whether the table is sortable or not, based on the presence of columns.
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
   * @param density
   * @type {string}
   * @default 'medium'
   * @description Determines the density of the table cells; options are "short", "medium" and "tall". If no density is defined, "medium" is used.
   */
  get density() {
    let { density = DEFAULT_DENSITY } = this.args;

    assert(
      `@density for "Hds::Table" must be one of the following: ${DENSITIES.join(
        ', '
      )}; received: ${density}`,
      DENSITIES.includes(density)
    );

    return density;
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

    // add a class based on the @density argument
    if (this.density) {
      classes.push(`hds-table--density-${this.density}`);
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
    // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
    this.sortedMessageText = `Sorted by ${this.sortBy} ${this.sortOrder}ending`;
  }
}
