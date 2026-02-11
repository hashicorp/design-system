import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoNumericalFilters = {
    'demo-numerical-a': {
      type: 'numerical',
      text: 'Numerical A',
      data: {
        selector: 'less-than',
        value: 10,
      },
    },
    'demo-numerical-b': {
      type: 'numerical',
      text: 'Numerical B',
      data: {
        selector: 'between',
        value: {
          start: 10,
          end: 20,
        }
      },
    }
  };

  @action
  demoUpdateNumericalFilters(newFilters) {
    this.demoNumericalFilters = newFilters;
  }
}
