import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LocalComponent extends Component {
  @action
  logClickedTab(event, index) {
    const tabId = event.target.id;
    console.log(`Tab with ID "${tabId}" and index "${index}" clicked!`);
  }
}
