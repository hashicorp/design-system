import Component from '@glimmer/component';
import { action } from '@ember/object';

// the "Toast" is built on top of the "Alert" so it shares the same colors
import { COLORS } from '@hashicorp/design-system-components/components/hds/alert';

export default class Index extends Component {
  get COLORS() {
    return COLORS;
  }

  @action
  noop() {
    //
  }

  @action
  yourOnDismissFunction() {
    console.log('Clicked the "dismiss" button in the "toast"!');
  }

  @action
  yourOnClickFunction() {
    console.log('Clicked the button in the "tag"!');
  }
}
