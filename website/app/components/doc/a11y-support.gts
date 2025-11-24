/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

const DocA11ySupport: TemplateOnlyComponent = <template>
  <h2
    class="doc-text-h2 doc-page-sidecar-scroll-margin-top"
    id="support"
  >Support</h2>
  <p class="doc-text-body">If any accessibility issues have been found within
    this component, let us know by
    <LinkTo
      class="doc-link-generic"
      @route="show"
      @model="about/support"
    >submitting an issue</LinkTo>.</p>
</template>;

export default DocA11ySupport;
