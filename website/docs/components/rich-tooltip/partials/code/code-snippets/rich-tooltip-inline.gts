import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsRichTooltip,
  HdsTextDisplay,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  Lorem
  <HdsRichTooltip as |RT|>
    <RT.Toggle @isInline={{true}} @text="ipsum dolor" />
    <RT.Bubble>
      <HdsTextDisplay @tag="h4" @size="200">Some title</HdsTextDisplay>
      <HdsTextBody @tag="p" @size="200">Some descriptive information</HdsTextBody>
    </RT.Bubble>
  </HdsRichTooltip>
  sit amet consectetur adipiscing elit.
</template>;

export default LocalComponent;
