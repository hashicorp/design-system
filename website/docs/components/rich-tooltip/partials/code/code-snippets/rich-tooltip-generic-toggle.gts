import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsRichTooltip,
  HdsTextDisplay,
  HdsTextBody,
  HdsTag,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsRichTooltip as |RT|>
    <RT.Toggle>
      <HdsTag @text="My text tag" />
    </RT.Toggle>
    <RT.Bubble>
      <HdsTextDisplay @tag="h4" @size="200">Some title</HdsTextDisplay>
      <HdsTextBody @tag="p" @size="200">Some descriptive information</HdsTextBody>
    </RT.Bubble>
  </HdsRichTooltip>
</template>;

export default LocalComponent;
