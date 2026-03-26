import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import {
  HdsFormField,
  HdsFormTextInputBase,
} from '@hashicorp/design-system-components/components';
import hdsTooltip from '@hashicorp/design-system-components/modifiers/hds-tooltip';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormField @layout="vertical" as |F|>
    <F.Label @controlId="tooltip-example-control-id">First Name</F.Label>
    <F.Control>
      <HdsFormTextInputBase
        {{hdsTooltip
          "Hello!"
          options=(hash placement="top" offset=(array 0 30))
        }}
        @type="text"
        @value="Jane"
        id="tooltip-example-control-id"
        @width="200px"
      />
    </F.Control>
  </HdsFormField>
</template>;

export default LocalComponent;
