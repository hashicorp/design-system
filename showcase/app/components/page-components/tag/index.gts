/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContent from 'showcase/components/page-components/tag/sub-sections/content';
import SubSectionStates from 'showcase/components/page-components/tag/sub-sections/states';
import SubSectionLinkColors from 'showcase/components/page-components/tag/sub-sections/link-colors';
import SubSectionContainers from 'showcase/components/page-components/tag/sub-sections/containers';
import SubSectionTooltipPlacements from 'showcase/components/page-components/tag/sub-sections/tooltip-placements';
import SubSectionInheritance from 'showcase/components/page-components/tag/sub-sections/inheritance';
import SubSectionDemos from 'showcase/components/page-components/tag/sub-sections/demos';

const TagIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Tag Component"}}

  <ShwTextH1>Tag</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionStates />
    <SubSectionLinkColors />
    <SubSectionContainers />
    <SubSectionTooltipPlacements />
    <SubSectionInheritance />
  </section>

  {{! For some reason, Ember tests don't play well with iframes (URL not found) so we can't take snapshots of these examples in Percy }}
  <section>
    <SubSectionDemos />
  </section>
</template>;

export default TagIndex;
