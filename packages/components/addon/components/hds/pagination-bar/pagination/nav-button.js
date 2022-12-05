// TODO: Test button in isolation (the API, the UI, the interaction)

import Component from '@glimmer/component';
import { action } from '@ember/object';

export const DIRECTIONS = ['next', 'previous'];

export default class HdsPaginationBarPaginationIndexComponent extends Component {
  @action
  onClick() {
    let { onClick } = this.args;

    if (typeof onClick === 'function') {
      onClick(this.args.direction);
    }
  }
}
