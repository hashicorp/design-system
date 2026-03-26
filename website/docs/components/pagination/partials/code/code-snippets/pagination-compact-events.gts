import Component from '@glimmer/component';

import { HdsPaginationCompact } from '@hashicorp/design-system-components/components';

import type { HdsPaginationDirections } from '@hashicorp/design-system-components/components/hds/pagination/types';

export default class LocalComponent extends Component {
  handlePageChange = (page: HdsPaginationDirections) => {
    console.log(`Page changed to "${page}"!`);
  };

  <template>
    <HdsPaginationCompact @onPageChange={{this.handlePageChange}} />
  </template>
}
