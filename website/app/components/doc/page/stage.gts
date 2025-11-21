/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface DocPageStageSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const DocPageStage: TemplateOnlyComponent<DocPageStageSignature> = <template>
  <main
    class="doc-page-stage"
    ...attributes
    id="main"
    aria-labelledby="doc-page-cover__title"
  >
    {{yield}}
  </main>
</template>;

export default DocPageStage;
