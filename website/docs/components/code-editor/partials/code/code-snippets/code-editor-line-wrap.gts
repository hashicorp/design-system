import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeEditor
    @ariaLabel="line wrapping example"
    @hasLineWrapping={{true}}
    @value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  />
</template>;

export default LocalComponent;
