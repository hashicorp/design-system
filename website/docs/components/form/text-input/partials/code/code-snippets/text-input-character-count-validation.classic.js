import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class LocalComponent extends Component {
  @tracked value = 'my-cluster-1234';
  minLength = 30;

  get fieldIsInvalid() {
    return this.value.length > 0 && this.value.length < this.minLength;
  }

  @action
  updateValue(event) {
    this.value = event.target.value;
  }
}
