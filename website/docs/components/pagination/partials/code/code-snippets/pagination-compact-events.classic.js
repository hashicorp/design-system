import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LocalComponent extends Component {
  @action
  handlePageChange(page) {
    console.log(`Page changed to "${page}"!`);
  }
}
