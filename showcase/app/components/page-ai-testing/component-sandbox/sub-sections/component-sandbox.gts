/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFrame from 'showcase/components/shw/frame';

/**
 * UI Shell detected in migrated output (cds-header + cds-side-nav use position:fixed).
 * CWC output lives in sandbox-standalone.html and is rendered via ShwFrame iframe.
 * Migration applied: full mode — 25 candidates (6 high + 19 medium approved).
 * Skipped: sandbox-appframe-layout, sandbox-appsidenavlist-* (low confidence).
 * See migration-plan-2025-07-17T180000Z.json and migration-report-2025-07-17T180000Z.md.
 */
const SubSectionComponentSandbox: TemplateOnlyComponent = <template>
  <ShwTextH2>Carbon Web Components Migration Sandbox</ShwTextH2>

  <ShwTextBody>
    A full application layout migrated from Helios Design System to Carbon Web
    Components. Rendered in an iframe to properly contain Carbon's
    fixed-position UI Shell components (cds-header, cds-side-nav).
  </ShwTextBody>

  <ShwFrame
    @src="/sandbox-standalone.html"
    @label="Carbon Web Components Migration Sandbox"
    @height="780"
  />

  <ShwDivider />
</template>;

export default SubSectionComponentSandbox;
