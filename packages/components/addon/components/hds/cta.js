import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HdsCtaComponent extends Component {
  @action
  doRouteTransition(e) {
    if (document.activeElement) {
      e.preventDefault();
      document.activeElement.click();
    }
    return;
  }
}
