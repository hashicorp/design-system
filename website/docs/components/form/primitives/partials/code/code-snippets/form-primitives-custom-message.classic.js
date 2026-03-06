import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked value = '';

  @action updateValue(event) {
    this.value = event.target.value;
  }
}
