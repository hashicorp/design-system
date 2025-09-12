/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

const CodeFragmentWithContainer: TemplateOnlyComponent = <template>
  <HdsApplicationState @align="center" as |A|>
    <A.Header @title="No stacks" />
    <A.Body @text="No stacks to show in this project." />
    <A.Footer as |F|>
      <F.Button @color="primary" @text="Create stack" />
    </A.Footer>
  </HdsApplicationState>
</template>;

export default CodeFragmentWithContainer;
