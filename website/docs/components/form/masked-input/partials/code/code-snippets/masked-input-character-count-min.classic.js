import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked value = '036215df4996ca649928d88';

  @action updateValue(event) {
    this.value = event.target.value;
  }
}
