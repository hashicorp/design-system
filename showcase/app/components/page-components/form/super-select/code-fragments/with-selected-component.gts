/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTextBody } from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithSelectedComponentSignature {
  Args: {
    option: {
      size: string;
    };
  };
  Element: HTMLSpanElement;
}

const CodeFragmentWithSelectedComponent: TemplateOnlyComponent<CodeFragmentWithSelectedComponentSignature> =
  <template>
    <HdsTextBody @tag="span" @size="200">{{@option.size}}</HdsTextBody>
  </template>;

export default CodeFragmentWithSelectedComponent;
