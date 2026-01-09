import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AccordionExpandAll extends Component {
  @tracked accordionState = 'close';

  @action
  toggleAccordionState() {
    this.accordionState = this.accordionState === 'open' ? 'close' : 'open';
  }
}
