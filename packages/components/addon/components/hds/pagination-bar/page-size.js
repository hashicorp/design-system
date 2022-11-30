import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsPaginationBarIndexComponent extends Component {
  /**
   * Generates a unique ID for the pageSize select
   *
   * @param pageSizeId
   */
  pageSizeId = 'pagination-page-size-' + guidFor(this);

  @action
  onChange(e) {
    let { onChange } = this.args;

    if (typeof onChange === 'function') {
      onChange(parseInt(e.target.value, 10));
    }
  }
}
