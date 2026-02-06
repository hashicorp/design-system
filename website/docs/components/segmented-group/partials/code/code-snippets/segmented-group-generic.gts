import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsSegmentedGroup } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsSegmentedGroup as |SG|>
    <SG.TextInput aria-label="input leading generic segment" size="32" />
    <SG.Generic>
      <DocPlaceholder @text="generic segment" @height="36" @background="#eee" />
    </SG.Generic>
  </HdsSegmentedGroup>
</template>;

export default LocalComponent;
