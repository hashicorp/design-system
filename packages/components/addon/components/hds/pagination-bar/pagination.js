import Component from '@glimmer/component';

export default class HdsPaginationBarIndexComponent extends Component {
  get isNumbered() {
    let { type } = this.args;

    return type === 'numbered';
  }

  get isCompact() {
    let { type } = this.args;

    return type === 'compact';
  }
}
