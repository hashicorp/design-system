import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DocPageHeaderComponent extends Component {
  @service router;
  @service fastboot;

  @tracked burgerMenuOpen = false;
  @tracked currentTopRoute = 'foundations';

  constructor() {
    super(...arguments);

    // schedule nav udpate for after this content is rendered
    // if (!this.fastboot.isFastBoot) { // TODO! this is not working?
    schedule('routerTransitions', () => {
      console.log('called routerTransitions');
      this.updateNavigation();
      // should I use addObserver instead?
      // https://api.emberjs.com/ember/4.8/classes/RouterService/methods?anchor=addObserver
      this.router.on('routeDidChange', this, this.updateNavigation);
    });
    // }
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.router.off('routeDidChange', this, this.updateNavigation);
  }

  // @action
  updateNavigation() {
    // eg. /foundations/colors/
    this.currentTopRoute = this.router.currentURL.split('/')[1];
  }

  get classNames() {
    let classes = ['doc-page-header'];

    return classes.join(' ');
  }

  @action
  toggleBurgerMenu() {
    this.burgerMenuOpen = !this.burgerMenuOpen;
  }
}
