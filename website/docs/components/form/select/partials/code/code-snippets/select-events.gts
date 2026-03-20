import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormSelectField } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnBlurFunction = () => {
    console.log('Invoked "yourOnBlurFunction"');
  };

  <template>
    <HdsFormSelectField
      {{on "blur" this.yourOnBlurFunction}}
      name="demo-target-infrastructure"
      as |F|
    >
      <F.Label>Target infrastructure</F.Label>
      <F.Options>
        <option value=""></option>
        <option value="Kubernetes">Kubernetes</option>
        <option value="Other">Other</option>
      </F.Options>
    </HdsFormSelectField>
  </template>
}
