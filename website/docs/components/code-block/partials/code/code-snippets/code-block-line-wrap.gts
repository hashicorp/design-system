import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeBlock } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeBlock
    @ariaLabel="line wrapping"
    @language="ruby"
    @hasLineWrapping={{true}}
    @value="codeLang='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam';"
  />
</template>;

export default LocalComponent;
