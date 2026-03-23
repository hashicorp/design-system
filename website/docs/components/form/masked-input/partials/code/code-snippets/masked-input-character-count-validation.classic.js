import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked value = '036215df4996ca649928d8864b4df9e42cba0d';
  @tracked minLength = 40;

  get fieldIsInvalid() {
    return this.value.length < this.minLength;
  }

  @action updateValue(event) {
    this.value = event.target.value;
  }
}
