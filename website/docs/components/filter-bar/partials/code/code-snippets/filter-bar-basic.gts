import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { HdsFilterBar } from '@hashicorp/design-system-components/components';
import type { HdsFilterBarSignature } from '@hashicorp/design-system-components/components/hds/filter-bar/index';

export default class LocalComponent extends Component {
  @tracked demoFilters: HdsFilterBarSignature['Args']['filters'] = {
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
    },
  };

  demoUpdateFilters = (
    newFilters: HdsFilterBarSignature['Args']['filters'],
  ) => {
    // 1. Filter your data set based on the filters

    // 2. Update the filters object which is passed to the Filter Bar
    this.demoFilters = newFilters;
  };

  <template>
    <HdsFilterBar
      @filters={{this.demoFilters}}
      @onFilter={{this.demoUpdateFilters}}
      as |F|
    >
      <F.FiltersDropdown as |D|>
        <D.FilterGroup
          @key="project"
          @text="Project"
          @type="multi-select"
          as |F|
        >
          <F.Checkbox @value="project-1" @label="Project 1" />
          <F.Checkbox @value="project-2" @label="Project 2" />
          <F.Checkbox @value="project-3" @label="Project 3" />
        </D.FilterGroup>
        <D.FilterGroup
          @key="version"
          @text="Version"
          @type="single-select"
          as |F|
        >
          <F.Radio @value="1.0" @label="1.0" />
          <F.Radio @value="2.0" @label="2.0" />
          <F.Radio @value="3.0" @label="3.0" />
        </D.FilterGroup>
      </F.FiltersDropdown>
    </HdsFilterBar>
  </template>
}
