import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;
  @service fastboot;

  // notice: don't set it to false, otherwise the sidebar menu will appear open on page load
  @tracked isSidebarVisibleOnSmallViewport;

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, 'routeDidChange');
  }

  routeDidChange() {
    scheduleOnce('afterRender', this, this.onToggleBurgerMenu);
  }

  willDestroy() {
    this.router.off('routeDidChange', this, 'routeDidChange');
  }

  get currentTopRoute() {
    return this.router.currentURL.split('/')[1];
  }

  @action
  onToggleBurgerMenu() {
    if (this.isSidebarVisibleOnSmallViewport === false) {
      this.isSidebarVisibleOnSmallViewport = true;
      if (!this.fastboot.isFastBoot) {
        document.body.classList.add('isSidebarVisibleOnSmallViewport');
      }
    } else {
      this.isSidebarVisibleOnSmallViewport = false;
      if (!this.fastboot.isFastBoot) {
        document.body.classList.remove('isSidebarVisibleOnSmallViewport');
      }
    }
  }
}
