import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormCheckboxGroup,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormCheckboxGroup @name="demo-methods" as |G|>
    <G.Legend>Methods
      <HdsBadge @size="small" @text="Beta" @color="highlight" /></G.Legend>
    <G.HelperText>All methods are applied by default unless specified. See
      <HdsLinkInline @href="#">HTTP protocol</HdsLinkInline>
      for more details.</G.HelperText>
    <G.CheckboxField checked as |F|>
      <F.Label>POST</F.Label>
    </G.CheckboxField>
    <G.CheckboxField checked as |F|>
      <F.Label>GET</F.Label>
    </G.CheckboxField>
    <G.CheckboxField checked as |F|>
      <F.Label>PUT</F.Label>
    </G.CheckboxField>
  </HdsFormCheckboxGroup>
</template>;

export default LocalComponent;
