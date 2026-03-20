import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsRichTooltip,
  HdsTextDisplay,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsRichTooltip @enableClickEvents={{true}} as |RT|>
    <RT.Toggle @size="medium" @text="More info" @icon="info" />
    <RT.Bubble @enableCollisionDetection="auto">
      <HdsTextDisplay @tag="h4" @size="200">Some title</HdsTextDisplay>
      <HdsTextBody @tag="p" @size="200">Some descriptive information that spans
        multiple lines</HdsTextBody>
    </RT.Bubble>
  </HdsRichTooltip>
</template>;

export default LocalComponent;
