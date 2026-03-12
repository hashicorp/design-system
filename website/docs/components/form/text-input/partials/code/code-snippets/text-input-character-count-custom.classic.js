import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  @tracked value = 'my-cluster-1234';

  @action
  updateValue(event) {
    this.value = event.target.value;
  }
}
