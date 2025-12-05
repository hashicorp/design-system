/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

const DocNpmVersion: TemplateOnlyComponent = <template>
  <div class="doc-npm-version">
    <a
      href="https://badge.fury.io/js/@hashicorp%2Fdesign-system-components"
    ><img
        src="https://badge.fury.io/js/@hashicorp%2Fdesign-system-components.svg"
        alt="npm version"
        height="18"
      /></a>
  </div>
</template>;

export default DocNpmVersion;
