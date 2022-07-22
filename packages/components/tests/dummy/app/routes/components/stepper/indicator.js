import Route from '@ember/routing/route';

import { STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/indicator/step'

export default class ComponentsStepperIndicatorRoute extends Route {
    model() {
        const STATES = ["default", "hover", "active"];
        return { STATES, STATUSES };
    }
}
