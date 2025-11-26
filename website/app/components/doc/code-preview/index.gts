/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import DynamicTemplate from 'website/components/dynamic-template';

interface DocCodeGroupSignature {
  Args: {
    templateString?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const DocCodeGroup: TemplateOnlyComponent<DocCodeGroupSignature> = <template>
  <div>
    <DynamicTemplate @templateString={{@templateString}} />
  </div>
</template>;

export default DocCodeGroup;
