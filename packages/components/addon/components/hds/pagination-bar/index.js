import Component from '@glimmer/component';
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
}
