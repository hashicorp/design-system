import Route from '@ember/routing/route';

import { STATUSES as STEP_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/indicator/step';
import { STATUSES as TASK_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/indicator/task'

export default class ComponentsStepperRoute extends Route {
  model() {
    const STATES = ['default', 'hover', 'active'];
    return { STATES, STEP_STATUSES, TASK_STATUSES };
  }
}
