import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked showHighlight = false;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  logClickedTab(event) {
    const tabId = event.target.id;
    console.log(`Tab with ID "${tabId}" clicked!`);
  }
}
