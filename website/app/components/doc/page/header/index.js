import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default class DocPageHeaderComponent extends Component {
  @service router;
  @service fastboot;

  @tracked currentTopRoute = 'foundations';

  constructor() {
    super(...arguments);

    // schedule nav udpate for after this content is rendered
    // if (!this.fastboot.isFastBoot) { // TODO! this is not working?
    schedule('routerTransitions', () => {
      console.log('called routerTransitions');
      this.updateNavigation();
      this.addExitHandler();
    });
    // }
  }

  addExitHandler() {
    console.log('addExitHandler called');
    // should I use addObserver instead?
    // https://api.emberjs.com/ember/4.8/classes/RouterService/methods?anchor=addObserver
    this.router.on('routeDidChange', this, this.updateNavigation);
  }

  removeExitHandler() {
    console.log('removeExitHandler called');
    // should I use addObserver instead?
    // https://api.emberjs.com/ember/4.8/classes/RouterService/methods?anchor=addObserver
    this.router.off('routeDidChange', this, this.updateNavigation);
  }

  willDestroy() {
    console.log('willDestroy called');
    super.willDestroy(...arguments);
    this.removeExitHandler();
  }

  // @action
  updateNavigation() {
    // eg. /foundations/colors/
    this.currentTopRoute = this.router.currentURL.split('/')[1];
  }

  @action
  test() {
    this.updateNavigation();
  }
}
