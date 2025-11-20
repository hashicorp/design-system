/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import { hash } from '@ember/helper';

import DocComponentApiProperty from 'website/components/doc/component-api/property';
import type { DocComponentApiPropertySignature } from 'website/components/doc/component-api/property';

interface DocComponentApiSignature {
  Blocks: {
    default: [
      {
        Property: ComponentLike<DocComponentApiPropertySignature>;
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
