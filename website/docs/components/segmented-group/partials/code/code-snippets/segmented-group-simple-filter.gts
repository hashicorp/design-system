import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsSegmentedGroup } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsSegmentedGroup as |SG|>
    <SG.TextInput @type="search" placeholder="Search" aria-label="Search" />
    <SG.Dropdown as |D|>
      <D.ToggleButton @color="secondary" @text="Across" @count="2" />
      <D.Checkbox checked>Metadata</D.Checkbox>
      <D.Checkbox checked>Tags</D.Checkbox>
      <D.Checkbox>Service name</D.Checkbox>
    </SG.Dropdown>
  </HdsSegmentedGroup>
</template>;

export default LocalComponent;
