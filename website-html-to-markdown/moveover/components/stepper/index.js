import Component from '@glimmer/component';

import { STATUSES as STEP_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/step/indicator';
import { STATUSES as TASK_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/task/indicator';

export default class Index extends Component {
  get STATES() {
    // these are used only for presentation purpose in the showcase
    return ['default', 'hover', 'active'];
  }

  get STEP_STATUSES() {
    return STEP_STATUSES;
  }

  get TASK_STATUSES() {
    return TASK_STATUSES;
  }
}
