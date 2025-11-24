/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
// import { CodeGroup, CodeBlock } from 'ember-shiki';

interface DocCodeGroupSignature {
  Args: {
    filename?: string;
    snippet1?: string;
    snippet2?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const TAB_NAMES = ['.hbs', '.gts'];

const DocCodeGroup: TemplateOnlyComponent<DocCodeGroupSignature> = <template>
  <div>Test {{@filename}}</div>

  {{!-- <CodeGroup @names={{TAB_NAMES}} as |Tab|>
    <Tab @name=".hbs">
      <CodeBlock @code={{@snippet1}} @language="hbs" />
    </Tab>
    <Tab @name=".gts">
      <CodeBlock @code={{@snippet2}} @language="gts" />
    </Tab>
  </CodeGroup> --}}
</template>;

export default DocCodeGroup;
