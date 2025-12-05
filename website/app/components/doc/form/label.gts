/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface DocFormLabelSignature {
  Args: {
    label: string;
    for: string;
  };
}

const DocFormLabel: TemplateOnlyComponent<DocFormLabelSignature> = <template>
  <label class="doc-form-label" for={{@for}}>{{@label}}</label>
</template>;

export default DocFormLabel;
