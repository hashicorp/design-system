/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import DocComponentApiProperty from 'website/components/doc/component-api/property';

interface DocComponentApiSignature {
  Blocks: {
    default: [
      {
        Property: typeof DocComponentApiProperty;
      },
    ];
  };
  Element: HTMLDivElement;
}

const DocComponentApi: TemplateOnlyComponent<DocComponentApiSignature> =
  <template>
    <div class="doc-component-api" ...attributes>
      {{yield (hash Property=DocComponentApiProperty)}}
    </div>
  </template>;

export default DocComponentApi;
