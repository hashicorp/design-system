import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { SIZES } from '@hashicorp/design-system-components/components/hds/flyout';

export default class Index extends Component {
  @tracked basicFlyoutActive = false;

  get SIZES() {
    return SIZES;
  }

  @action
  activateFlyout(flyout) {
    this[flyout] = true;
    document.body.style.overflow = 'hidden';
  }

  @action
  deactivateFlyout(flyout) {
    this[flyout] = false;
    document.body.style.overflow = 'auto';
  }
}
