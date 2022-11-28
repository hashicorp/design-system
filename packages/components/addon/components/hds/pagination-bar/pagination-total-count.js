import Component from '@glimmer/component';

export default class HdsPaginationBarIndexComponent extends Component {
  /**
   * Shows totalItems if true
   *
   * @param hasTotalItems
   * @type {boolean}
   * @default true
   */
  get hasTotalItems() {
    return this.args.hasTotalItems ?? true;
  }
}
