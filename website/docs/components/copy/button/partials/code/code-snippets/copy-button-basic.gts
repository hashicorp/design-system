import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <p id="clipboardTarget" class="doc-copy-button-copy-text">
    The button will copy the text in this paragraph element.
  </p>
  <HdsCopyButton @text="Copy" @targetToCopy="#clipboardTarget" />
</template>;

export default LocalComponent;
