import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { next, later, cancel } from '@ember/runloop';

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
    scheduleOnce('afterRender', this, this.resetSidebar);
  }

  willDestroy() {
    this.router.off('routeDidChange', this, 'routeDidChange');
  }

  get currentTopRoute() {
    return this.router.currentURL.split('/')[1];
  }

  resetSidebar() {
    this.isSidebarVisibleOnSmallViewport = false;
    if (!this.fastboot.isFastBoot) {
      document.body.classList.remove('isSidebarVisibleOnSmallViewport');
      document.body.classList.remove('isSidebarInRenderTree');
      if (this.runNext) {
        cancel(this.runNext);
      }
      if (this.runLater) {
        cancel(this.runLater);
      }
    }
  }

  showSidebarOnSmallViewport() {
    if (!this.fastboot.isFastBoot) {
      document.body.classList.add('isSidebarInRenderTree');
      if (this.runLater) {
        cancel(this.runLater);
      }
      this.runNext = next(() => {
        document.body.classList.add('isSidebarVisibleOnSmallViewport');
      });
    }
  }

  hideSidebarOnSmallViewport() {
    if (!this.fastboot.isFastBoot) {
      document.body.classList.remove('isSidebarVisibleOnSmallViewport');
      if (this.runNext) {
        cancel(this.runNext);
      }
      this.runLater = later(() => {
        document.body.classList.remove('isSidebarInRenderTree');
      }, 250);
    }
  }

  @action
  onToggleBurgerMenu() {
    if (this.isSidebarVisibleOnSmallViewport === false) {
      this.isSidebarVisibleOnSmallViewport = true;
      this.showSidebarOnSmallViewport();
    } else {
      this.isSidebarVisibleOnSmallViewport = false;
      this.hideSidebarOnSmallViewport();
    }
  }
}
