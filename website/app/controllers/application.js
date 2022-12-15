import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked showSidebarOnSmallViewport = false;

  // TODO add a reset for the `showSidebarOnSmallViewport` on route change

  @action
  onToggleBurgerMenu(isOpen) {
    console.log('onToggleBurgerMenu', isOpen);
    this.showSidebarOnSmallViewport = isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }
}
