import Component from '@glimmer/component';

export default class HdsPaginationInfoComponent extends Component {
  /**
   * @param showTotalItems
   * @type {boolean}
   * @description Controls the visibility of the total items
   */
  get showTotalItems() {
    return this.args.showTotalItems ?? true;
  }
}
