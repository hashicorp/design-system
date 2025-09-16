/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type { HdsApplicationStateSignature } from '@hashicorp/design-system-components/components/hds/application-state/index';

interface CodeFragmentWithContainerSignature {
  Element: HdsApplicationStateSignature['Element'];
}

const CodeFragmentWithContainer: TemplateOnlyComponent<CodeFragmentWithContainerSignature> = <template>
  <HdsApplicationState @align="center" as |A|>
    <A.Header @title="No stacks" />
    <A.Body @text="No stacks to show in this project." />
    <A.Footer as |F|>
      <F.Button @color="primary" @text="Create stack" />
    </A.Footer>
  </HdsApplicationState>
</template>;

export default CodeFragmentWithContainer;
