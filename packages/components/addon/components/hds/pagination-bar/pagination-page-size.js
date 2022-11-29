import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class HdsPaginationBarIndexComponent extends Component {
  /**
   * Generates a unique ID for the pageSize select
   *
   * @param pageSizeId
   */
   pageSizeId = 'pagination-page-size-' + guidFor(this);
}