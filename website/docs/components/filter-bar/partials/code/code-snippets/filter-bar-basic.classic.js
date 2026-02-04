import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalComponent extends Component {
  @tracked demoFilters = {
    project: {
      type: 'multi-select',
      text: 'Project',
      data: [
        { value: 'project-1', label: 'Project 1' },
        { value: 'project-2', label: 'Project 2' },
      ],
    },
    version: {
      type: 'single-select',
      text: 'Version',
      data: {
        value: '1.0',
        label: '1.0',
      },
    }
  };

  @action
  demoUpdateFilters(newFilters) {
    // 1. Filter your data set based on the filters

    // 2. Update the filters object which is passed to the Filter Bar
    this.demoFilters = newFilters;
  }
}
