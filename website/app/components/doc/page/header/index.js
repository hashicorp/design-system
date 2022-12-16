import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class DocPageHeaderComponent extends Component {
  @service router;
  @tracked burgerMenuOpen = false;

  get currentTopRoute() {
    return this.router.currentURL.split('/')[1];
  }

  @action
  toggleBurgerMenu() {
    this.burgerMenuOpen = !this.burgerMenuOpen;
  }
}
