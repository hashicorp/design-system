/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionDemo from 'showcase/components/page-foundations/breakpoints/sub-sections/demo';

const BreakpointsIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Breakpoints"}}

  <ShwTextH1>Breakpoints</ShwTextH1>

  {{! For some reason, Ember tests don't play well with iframes (URL not found) so we can't take snapshots of these examples in Percy }}
  <section>
    <SubSectionDemo />
  </section>
</template>;

export default BreakpointsIndex;
