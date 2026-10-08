import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked isContentMasked = true;

  toggleVisibility = () => {
    this.isContentMasked = !this.isContentMasked;
  };
}
