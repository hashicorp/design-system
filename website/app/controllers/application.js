import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;
  @service fastboot;

  // notice: don't set it to false, otherwise the sidebar menu will appear open on page load
  @tracked showSidebarOnSmallViewport;

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
    if (this.showSidebarOnSmallViewport === false) {
      this.showSidebarOnSmallViewport = true;
    } else {
      this.showSidebarOnSmallViewport = false;
    }
    if (!this.fastboot.isFastBoot) {
      document.body.style.overflow = this.showSidebarOnSmallViewport
        ? 'hidden'
        : 'auto';
    }
  }
}
