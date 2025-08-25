import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

import CopyButtonGenericContent from 'showcase/components/mock/components/copy/button/copy-button-generic-demo';

const CopyButtonTargetsDropdown: TemplateOnlyComponent = <template>
  <HdsDropdown @listPosition="bottom-left" as |dd|>
    <dd.ToggleButton @text="Open menu" />
    <dd.Generic>
      <CopyButtonGenericContent />
    </dd.Generic>
  </HdsDropdown>
</template>;

export default CopyButtonTargetsDropdown;
