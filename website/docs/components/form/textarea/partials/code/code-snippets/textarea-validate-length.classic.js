import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked value = 'This is my description';
  @tracked minLength = 100;

  get fieldIsInvalid() {
    return this.value.length < this.minLength;
  }

  @action updateValue(event) {
    this.value = event.target.value;
  }
}
