import Route from '@ember/routing/route';

import { TYPES } from '@hashicorp/design-system-components/components/hds/form/text-input';

export default class ComponentsFormTextInputRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    const SAMPLE_ERROR_MESSAGES = [
      'First error message',
      'Second error message',
    ];
    return {
      TYPES,
      STATES,
      SAMPLE_ERROR_MESSAGES,
    };
  }
}
