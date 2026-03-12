import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormTextareaField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnBlurFunction = () => {
    console.log('Invoked "yourOnBlurFunction"');
  };

  <template>
    <HdsFormTextareaField
      placeholder="Workspace description"
      name="demo-description"
      {{on "blur" this.yourOnBlurFunction}}
      as |F|
    >
      <F.Label>Workspace description</F.Label>
    </HdsFormTextareaField>
  </template>
}
