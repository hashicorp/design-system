import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DocPageFooterComponent extends Component {
  @tracked showLayoutColors = false;

  @action
  toggleLayoutColors() {
    if (this.showLayoutColors) {
      this.showLayoutColors = false;
      document.body.classList.remove('🌈');
    } else {
      this.showLayoutColors = true;
      document.body.classList.add('🌈');
    }
  }
}
