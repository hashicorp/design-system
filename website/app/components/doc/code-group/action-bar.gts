/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface DocCodeGroupActionBarSignature {
  Blocks: {
    primary?: [];
    secondary?: [];
  };
}

const DocCodeGroupActionBar: TemplateOnlyComponent<DocCodeGroupActionBarSignature> =
  <template>
    <div class="doc-code-group__action-bar">
      <div>
        {{yield to="primary"}}
      </div>
      <div>
        {{yield to="secondary"}}
      </div>
    </div>
  </template>;

export default DocCodeGroupActionBar;
