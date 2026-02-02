import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <p id="clipboardTarget4" class="doc-copy-button-copy-text">
    The button will copy the text in this paragraph element.
  </p>
  <HdsCopyButton
    @text="Copy"
    @targetToCopy="#clipboardTarget4"
    @isFullWidth={{true}}
  />
</template>;

export default LocalComponent;
