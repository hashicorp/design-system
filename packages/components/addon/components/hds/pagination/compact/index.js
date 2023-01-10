import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HdsPaginationCompactIndexComponent extends Component {
  /**
   * @param showLabels
   * @type {boolean}
   * @default true
   * @description Show the labels for the "prev/next" controls
   */
  get showLabels() {
    let { showLabels = true } = this.args;

    return showLabels;
  }

  @action
  onPageChange(newPage) {
    this.currentPage = newPage;

    let { onPageChange } = this.args;

    if (typeof onPageChange === 'function') {
      onPageChange(newPage);
    }
  }
}
