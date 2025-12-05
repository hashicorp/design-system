/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/code-editor/sub-sections/content';
import SubSectionStandalone from 'showcase/components/page-components/code-editor/sub-sections/standalone';
import SubSectionHeader from 'showcase/components/page-components/code-editor/sub-sections/header';
import SubSectionSyntaxHighlighting from 'showcase/components/page-components/code-editor/sub-sections/syntax-highlighting';
import SubSectionLinting from 'showcase/components/page-components/code-editor/sub-sections/linting';
import SubSectionCustomExtension from 'showcase/components/page-components/code-editor/sub-sections/custom-extension';
import SubSectionStandaloneModifier from 'showcase/components/page-components/code-editor/sub-sections/standalone-modifier';

const CodeEditorIndex: TemplateOnlyComponent = <template>
  {{pageTitle "CodeEditor Component"}}

  <ShwTextH1>CodeEditor</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionStandalone />
    <SubSectionHeader />
    <SubSectionSyntaxHighlighting />
    <SubSectionLinting />
    <SubSectionCustomExtension />
    <SubSectionStandaloneModifier />
  </section>
</template>;

export default CodeEditorIndex;
