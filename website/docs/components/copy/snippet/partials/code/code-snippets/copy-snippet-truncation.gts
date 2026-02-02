import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCopySnippet } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-copy-snippet-demo-constrain-width">
    <HdsCopySnippet
      @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r with a bunch of other long text that should force truncation if truncation is set to true"
      @isTruncated={{true}}
    />
  </div>
</template>;

export default LocalComponent;
