/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface DocImageCaptionSignature {
  Args: {
    text: string;
  };
  Element: HTMLDivElement;
}

const DocImageCaption: TemplateOnlyComponent<DocImageCaptionSignature> =
  <template>
    <div class="doc-image-caption doc-text-body-small" ...attributes>
      {{@text}}
    </div>
  </template>;

export default DocImageCaption;
