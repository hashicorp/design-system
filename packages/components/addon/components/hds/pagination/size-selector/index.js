import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

export default class HdsPaginationSizeSelectorComponent extends Component {
  /**
   * Generates a unique ID for the pageSize select
   *
   * @param SizeSelectorId
   */
  SizeSelectorId = 'pagination-size-selector-' + guidFor(this);

  /**
   * @param sizes
   * @type {array of numbers}
   * @description Set the page sizes users can select from.
   */
  get sizes() {
    let { sizes } = this.args;

    assert('@sizes must be defined', sizes !== undefined);

    return sizes;
  }

  @action
  onChange(e) {
    let { onChange } = this.args;

    if (typeof onChange === 'function') {
      onChange(parseInt(e.target.value));
    }
  }
}
