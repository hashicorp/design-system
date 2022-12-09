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
    schedule('afterRender', () => {
      console.log('called afterRender');
      this.updateNavigation();
    });
    // }
  }

  get menu() {
    let xxx = MENU.map((item) => {
      console.log('item1', item);
      item.isCurrent = item.route === this.currentTopRoute;
      console.log('item2', item);
      return item;
    });
    console.log('called getMenu', xxx);
    return xxx;
  }

  @action
  updateNavigation() {
    this.currentTopRoute = MENU[Math.floor(Math.random() * MENU.length)];
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
