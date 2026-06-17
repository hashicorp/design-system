/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';

const SubSectionCarbonDemoApp: TemplateOnlyComponent = <template>

  <ShwTextH2>Carbon Design System Demo</ShwTextH2>

  <ShwTextBody>
    A full application layout using Carbon Design System components, mirroring the Helios demo structure.
    This demo is displayed in an iframe to properly contain Carbon's fixed-position UI Shell components.
  </ShwTextBody>

  <iframe
    src="/carbon-demo-standalone.html"
    title="Carbon Design System Demo"
    {{style
      width="100%"
      height="600px"
      marginTop="24px"
      border="1px solid #e0e0e0"
      borderRadius="4px"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
    }}
  ></iframe>

  <ShwDivider />
</template>;

export default SubSectionCarbonDemoApp;
