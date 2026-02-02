import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsPageHeader,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsPageHeader as |PH|>
    <PH.Title>Page title</PH.Title>
    <PH.IconTile @icon="folder" />
    <PH.Actions>
      <HdsDropdown as |D|>
        <D.ToggleButton @text="Manage" @color="secondary" />
        <D.Interactive @route="components">Item One</D.Interactive>
        <D.Interactive @route="components">Item Two</D.Interactive>
        <D.Interactive @route="components">Item Three</D.Interactive>
        <D.Separator />
        <D.Interactive
          @route="components"
          @color="critical"
          @icon="trash"
        >Delete</D.Interactive>
      </HdsDropdown>
    </PH.Actions>
    <PH.Generic>
      <DocPlaceholder
        @text="generic metadata"
        @height="36"
        @width="350"
        @background="#eee"
      />
    </PH.Generic>
  </HdsPageHeader>
</template>;

export default LocalComponent;
