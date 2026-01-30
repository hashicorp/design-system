import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoSelectionFilters = {
    'demo-single-select': {
      type: 'single-select',
      text: 'Single-select',
      data: {
        value: 'option-1',
        label: 'Option 1',
      },
    },
    'demo-multi-select': {
      type: 'multi-select',
      text: 'Multi-select',
      data: [
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
      ],
    }
  };

  @action
  demoUpdateSelectionFilters(newFilters) {
    this.demoSelectionFilters = newFilters;
  }
}
