import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeEditor @value="Hello, world" as |CE|>
    <CE.Title>
      CodeEditor title
    </CE.Title>
    <CE.Description>
      CodeEditor description
    </CE.Description>
  </HdsCodeEditor>
</template>;

export default LocalComponent;
