import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { HdsFormTextareaBase } from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  yourOnBlurFunction = () => {
    console.log('Invoked "yourOnBlurFunction"');
  };

  <template>
    <HdsFormTextareaBase
      @value="My workspace"
      aria-label="Short description"
      placeholder="Workspace description"
      required={{true}}
      name="demo-description"
      {{on "blur" this.yourOnBlurFunction}}
    />
  </template>
}
