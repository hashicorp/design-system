import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormRadioGroup,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormRadioGroup @layout="horizontal" @name="method-demo1" as |G|>
    <G.Legend>Method
      <HdsBadge @size="small" @text="Beta" @color="highlight" /></G.Legend>
    <G.HelperText>Choose which HTTP method to use for the communication channel.
      See
      <HdsLinkInline @href="#">HTTP protocol</HdsLinkInline>
      for more details.</G.HelperText>
    <G.RadioField as |F|>
      <F.Label>POST</F.Label>
    </G.RadioField>
    <G.RadioField as |F|>
      <F.Label>GET</F.Label>
    </G.RadioField>
    <G.RadioField as |F|>
      <F.Label>PUT</F.Label>
    </G.RadioField>
  </HdsFormRadioGroup>
</template>;

export default LocalComponent;
