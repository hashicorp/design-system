import Component from '@glimmer/component';

import { HdsPaginationCompact } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  handlePageChange = (page: number, pageSize?: number) => {
    console.log(
      pageSize !== undefined
        ? `Page changed to "${page}" with page size equal to "${pageSize}"!`
        : `Page changed to "${page}"!`,
    );
  };

  <template>
    <HdsPaginationCompact @onPageChange={{this.handlePageChange}} />
  </template>
}
