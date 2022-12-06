import Component from '@glimmer/component';

export default class HdsPaginationBarTotalCountComponent extends Component {
  /**
   * Shows totalItems in UI if true
   *
   * @param showTotalItems
   * @type {boolean}
   * @default true
   */
  get showTotalItems() {
    return this.args.showTotalItems ?? true;
  }
}
