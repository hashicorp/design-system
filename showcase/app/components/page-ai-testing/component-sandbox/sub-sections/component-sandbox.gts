/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';

// ─── Swap this import to test any Helios component ───────────────────────────
//import { HdsIcon } from '@hashicorp/design-system-components/components';
import { HdsButton } from '@hashicorp/design-system-components/components';
// HdsLinkStandalone removed — replaced with cds-link (Carbon Web Component, no import needed)

// ─────────────────────────────────────────────────────────────────────────────

const SubSectionComponentSandbox: TemplateOnlyComponent = <template>
  <ShwTextH2>Component Sandbox</ShwTextH2>

  {{! ────────────────────────────────────────────────────────────────────── }}
  {{! Render the component you want to test below                            }}
  {{! ────────────────────────────────────────────────────────────────────── }}

  <HdsButton @text="testing" />




  {{! ────────────────────────────────────────────────────────────────────── }}
</template>;

export default SubSectionComponentSandbox;
