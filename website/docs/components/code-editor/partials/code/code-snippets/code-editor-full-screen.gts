import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeEditor
    @ariaLabel="full screen mode"
    @hasFullScreenButton={{true}}
    @value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  />
</template>;

export default LocalComponent;
