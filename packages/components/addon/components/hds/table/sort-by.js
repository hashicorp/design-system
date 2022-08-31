import Component from '@glimmer/component';

export default class HdsTableSortByComponent extends Component {
  get isActive() {
    return this.args.currentField === this.args.field;
  }

  get sortDescending() {
    if (this.args.sortDescending === 'false') return false;
    return !!this.args.sortDescending;
  }
}
