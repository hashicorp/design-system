import Component from '@glimmer/component';

import { HdsPaginationNumbered } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  handlePageChange = (page: number, pageSize: number) => {
    console.log(
      pageSize !== undefined
        ? `Page changed to "${page}" with page size equal to "${pageSize}"!`
        : `Page changed to "${page}"!`,
    );
  };

  handlePageSizeChange = (size: number) => {
    console.log(`Page size changed to "${size}"!`);
  };

  <template>
    <HdsPaginationNumbered
      @totalItems={{40}}
      @onPageChange={{this.handlePageChange}}
      @onPageSizeChange={{this.handlePageSizeChange}}
    />
  </template>
}
