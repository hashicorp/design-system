import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsDropdown,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsDropdown as |D|>
    <D.ToggleButton @text="Text Toggle" @color="secondary" />
    <D.Title @text="Integrate with Terraform Cloud" />
    <D.Description
      @text="Create a new run task in Terraform using the URL and key below."
    />
    <D.Generic>
      <HdsLinkStandalone @text="Watch tutorial video" @icon="film" @href="/" />
    </D.Generic>
  </HdsDropdown>
</template>;

export default LocalComponent;
