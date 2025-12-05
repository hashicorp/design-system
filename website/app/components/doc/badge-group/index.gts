/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface DocBadgeGroupSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const DocBadgeGroup: TemplateOnlyComponent<DocBadgeGroupSignature> = <template>
  <div class="doc-badge-group" ...attributes>
    {{yield}}
  </div>
</template>;

export default DocBadgeGroup;
