/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionContent from 'showcase/components/page-components/code-block/sub-sections/content';
import SubSectionOptions from 'showcase/components/page-components/code-block/sub-sections/options';
import SubSectionBaseElements from 'showcase/components/page-components/code-block/sub-sections/base-elements';
import SubSectionDemo from 'showcase/components/page-components/code-block/sub-sections/demo';

const CodeBlockIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CodeBlock Component"}}

  <ShwTextH1>CodeBlock</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <ShwDivider />
    <SubSectionOptions />
    <ShwDivider />
    <SubSectionBaseElements />
    <ShwDivider />
    <SubSectionDemo />
  </section>
</template>;

export default CodeBlockIndex;
