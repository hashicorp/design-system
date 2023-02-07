import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';

const DENSITIES = ['short', 'medium', 'tall'];
const DEFAULT_DENSITY = 'medium';
const VALIGNMENTS = ['top', 'middle'];
const DEFAULT_VALIGN = 'top';

export default class HdsTableIndexComponent extends Component {
  @tracked sortBy = this.args.sortBy;
  @tracked sortOrder = this.args.sortOrder || 'asc';
  @tracked sortedMessageText;

  /**
   * @param getSortCriteria
   * @type {string | function}
   * @default sortBy:sortOrder
   * @description Returns the sort criteria in the format of "sortBy:sortOrder" unless a customSort function is found.
   */
  get getSortCriteria() {
    // check for customSortMethod
    if (
      this.args.customSortMethod &&
      typeof this.args.customSortMethod === 'function'
    ) {
      return this.args.customSortMethod;
    } else {
      return `${this.sortBy}:${this.sortOrder}`;
    }
  }

  /**
   * @param identityKey
   * @type {string}
   * @default '@identity'
   * @description Returns the key to use for the table rows to provide more granular control. If no identityKey is defined, Ember's default `@identity` is used. See https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/each?anchor=each
   * this would be relevant for any table that would have data that could update or change, i.e., polling.
   */
  get identityKey() {
    return this.args.identityKey ?? '@identity';
  }

  /**
   * @param sortedMessageText
   * @type {string}
   * @default 'Sorted by ${sortBy} ${sortOrder}ending'
   * @description Returns the text to display in the sorted message. If no text is defined, the default text is used.
   */
  get sortedMessageText() {
    return (
      this.args.sortedMessageText ??
      `Sorted by ${this.sortBy} ${this.sortOrder}ending`
    );
  }

  /**
   * @param isStriped
   * @type {boolean}
   * @default false
   * @description Determines whether the table rows should have alternating background colors; defaults to false.
   */
  get isStriped() {
    return this.args.isStriped ?? false;
  }

  /**
   * @param isFixedLayout
   * @type {boolean}
   * @default false
   * @description Determines whether the table-display should be set to fixed; meaning, the table columns are of equal width no matter the content; defaults to false.
   */
  get isFixedLayout() {
    return this.args.isFixedLayout ?? false;
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
   * @param valign
   * @type {string}
   * @default 'top'
   * @description Determines the vertical alignment of the table cells; options are: "top", "middle". If no valign is defined, "top" is used.
   */
  get valign() {
    let { valign = DEFAULT_VALIGN } = this.args;

    assert(
      `@valign for "Hds::Table" must be one of the following: ${VALIGNMENTS.join(
        ', '
      )}; received: ${valign}`,
      VALIGNMENTS.includes(valign)
    );

    return valign;
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

    // add a class based on the @isFixedLayout argument
    if (this.isFixedLayout) {
      classes.push('hds-table--layout-fixed');
    }

    // add a class based on the @density argument
    if (this.density) {
      classes.push(`hds-table--density-${this.density}`);
    }

    // add a class based on the @valign argument
    if (this.valign) {
      classes.push(`hds-table--valign-${this.valign}`);
    }

    return classes.join(' ');
  }

  @action
  setSortBy(column) {
    if (this.sortBy === column) {
      // check to see if the column is already sorted and invert the sort order if so
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // otherwise, set the sort order to ascending
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    // we should allow the user to define a custom value here (e.g., for i18n) - tracked with HDS-965
    // see get sortedMessageText() above...can we use that here?
    this.sortedMessageText = `Sorted by ${this.sortBy} ${this.sortOrder}ending`;

    let { onSort } = this.args;

    if (typeof onSort === 'function') {
      onSort(this.sortBy, this.sortOrder);
    }
  }
}
