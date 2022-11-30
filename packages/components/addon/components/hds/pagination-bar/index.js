import Component from '@glimmer/component';
// import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export const TYPES = ['numbered', 'compact'];

export default class HdsPaginationBarIndexComponent extends Component {
  @tracked itemsPerPage = this.args.itemsPerPage;

  @tracked totalPages = Math.max(
    Math.ceil(this.args.totalItems / this.itemsPerPage),
    1
  );
  @tracked currentPage = this.args.currentPage ?? 1;

  @action
  onPageChange(newPage) {
    this.currentPage = newPage;
  }

  @action
  onPageSizeChange(newPageSize) {
    this.itemsPerPage = newPageSize;
    this.currentPage = 1;
    this.totalPages = Math.max(
      Math.ceil(this.args.totalItems / this.itemsPerPage),
      1
    );
  }

  // /**
  //  * Get the class names to apply to the component.
  //  * @method classNames
  //  * @return {string} The "class" attribute to apply to the component.
  //  */
  // get classNames() {
  //   let classes = ['hds-pagination-bar'];

  //   // add a class based on the @xxx argument
  //   // classes.push(`hds-pagination--[variant]-${this.xxx}`);

  //   return classes.join(' ');
  // }
}
