import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';

export default class DsIconGridComponent extends Component {
  @tracked size = '16';
  @tracked color = 'currentColor';

  @tracked currentIconSize = '16';
  @tracked visibleIconSize = '16';

  get contextRootURL() {
    const config = getOwner(this).resolveRegistration('config:environment');
    return config.rootURL || '/';
  }

  @action
  updateVisibleIconSize() {
    if (this.visibleIconSize === '16') {
      this.visibleIconSize = '24';
    } else {
      this.visibleIconSize = '16';
    }
  }
}
