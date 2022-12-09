import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';

const MENU = [
  {
    label: 'About',
    route: 'about',
  },
  {
    label: 'Foundations',
    route: 'foundations',
  },
  {
    label: 'Components',
    route: 'components',
  },
  {
    label: 'Patterns',
    route: 'patterns',
  },
];

export default class DocPageHeaderComponent extends Component {
  @service router;
  @service fastboot;

  @tracked showLayoutColors = false;
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

  get menu() {
    let xxx = MENU.map((item) => {
      // console.log('item1', item);
      item.isCurrent = item.route === this.currentTopRoute;
      // console.log('item2', item);
      return item;
    });
    console.log('called getMenu', xxx);
    return xxx;
  }

  @action
  updateNavigation() {
    // eg. /foundations/colors/
    this.currentTopRoute = this.router.currentURL.split('/')[1];
    console.log('updateNavigation', this.router, this.router.currentURL);
    // this.menu.forEach((item) => {
    //   item.isCurrent = true;
    // });
    // console.log('called updateNavigation', this.menu);
  }

  @action
  test() {
    this.updateNavigation();
  }
}
