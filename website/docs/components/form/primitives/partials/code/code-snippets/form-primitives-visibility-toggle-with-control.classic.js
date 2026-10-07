import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked isContentHidden = true;

  toggleVisibility = () => {
    this.isContentHidden = !this.isContentHidden;
  };
}
