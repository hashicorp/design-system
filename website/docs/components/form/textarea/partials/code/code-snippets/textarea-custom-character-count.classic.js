import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked value = 'This is my description';

  @action updateValue(event) {
    this.value = event.target.value;
  }
}
