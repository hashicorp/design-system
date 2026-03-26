import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LocalComponent extends Component {
  @action
  handlePageChange(page, pageSize) {
    console.log(
      pageSize !== undefined
        ? `Page changed to "${page}" with page size equal to "${pageSize}"!`
        : `Page changed to "${page}"!`
    );
  }

  @action
  handlePageSizeChange(size) {
    console.log(`Page size changed to "${size}"!`);
  }
}
