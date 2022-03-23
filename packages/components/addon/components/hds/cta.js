import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HdsCtaComponent extends Component {
  @action
  doRouteTransition(e) {
    console.log('This is triggered by every instance of the CTA in the page');
    if (document.activeElement) {
      console.log(
        'This should be triggered by only the "active" instance of the CTA, but is not (look in the devtools console)'
      );
      e.preventDefault();
      document.activeElement.click();
    }
    return;
  }
}
